"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BRAZIL_UFS } from "@/lib/api-config";

type Representante = {
  id: number;
  uf: string;
  cidade: string;
  nome: string;
  empresa: string | null;
  telefone: string | null;
  email: string | null;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  uf: string;
  cidade: string;
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
};

type LoadStatus = "idle" | "loading" | "success" | "error";

type ErpRepresentanteOption = {
  nome: string;
  empresa: string;
  telefone: string;
  email: string;
  adicionado?: boolean;
};

const EMPTY_FORM: FormState = {
  uf: "",
  cidade: "",
  nome: "",
  empresa: "",
  telefone: "",
  email: "",
};

type SyncResult = {
  processed: number;
  created: number;
  updated: number;
  skipped: number;
  failedCities: Array<{ uf: string; cidade: string; error: string }>;
};

function readApiCollection(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (
    payload &&
    typeof payload === "object" &&
    Array.isArray((payload as { data?: unknown }).data)
  ) {
    return (payload as { data: unknown[] }).data;
  }
  return [];
}

function pickString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeCityOptions(payload: unknown) {
  return Array.from(
    new Set(
      readApiCollection(payload)
        .map((item) => pickString(item))
        .filter(Boolean),
    ),
  );
}

function normalizeRepresentanteOptions(payload: unknown): ErpRepresentanteOption[] {
  return readApiCollection(payload)
    .map((item) => {
      const row =
        item && typeof item === "object"
          ? (item as Record<string, unknown>)
          : {};
      return {
        nome: pickString(row.nome),
        empresa: pickString(row.empresa),
        telefone: pickString(row.telefone),
        email: pickString(row.email),
        adicionado: row.adicionado === true,
      };
    })
    .filter((item) => item.nome.length > 0);
}

function representanteOptionKey(item: ErpRepresentanteOption) {
  return [item.nome, item.empresa, item.telefone, item.email].join("::");
}

function representativeOptionLabel(item: ErpRepresentanteOption) {
  return item.empresa ? `${item.nome} - ${item.empresa}` : item.nome;
}

function normalizeRepresentativeName(nome: string) {
  return nome.trim().toLocaleLowerCase("pt-BR");
}

function sameOptionText(left: string, right: string) {
  return (
    left.trim().localeCompare(right.trim(), "pt-BR", {
      sensitivity: "base",
    }) === 0
  );
}

function formRepresentativeOption(form: FormState): ErpRepresentanteOption | null {
  if (!form.nome.trim()) return null;
  return {
    nome: form.nome,
    empresa: form.empresa,
    telefone: form.telefone,
    email: form.email,
  };
}

export function RepresentantesAdminPanel() {
  const router = useRouter();
  const [items, setItems] = useState<Representante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterUf, setFilterUf] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Representante | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [citySearch, setCitySearch] = useState("");
  const [representativeSearch, setRepresentativeSearch] = useState("");
  const [cityOptions, setCityOptions] = useState<string[]>([]);
  const [cityOptionsStatus, setCityOptionsStatus] =
    useState<LoadStatus>("idle");
  const [representativeOptions, setRepresentativeOptions] = useState<
    ErpRepresentanteOption[]
  >([]);
  const [representativeOptionsStatus, setRepresentativeOptionsStatus] =
    useState<LoadStatus>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterUf) params.set("uf", filterUf);
      if (search.trim()) params.set("search", search.trim());

      const response = await fetch(
        `/api/admin/representantes${params.toString() ? `?${params.toString()}` : ""}`,
        { cache: "no-store" },
      );

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setError(payload?.error ?? "Erro ao carregar representantes");
        setItems([]);
        return;
      }

      const data = (await response.json()) as Representante[];
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError("Erro de rede ao carregar representantes");
    } finally {
      setLoading(false);
    }
  }, [filterUf, router, search]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  useEffect(() => {
    if (!formOpen || !form.uf) return;

    const controller = new AbortController();
    void (async () => {
      setCityOptionsStatus("loading");
      try {
        const response = await fetch(
          `/api/admin/representantes/opcoes/cidades?uf=${encodeURIComponent(form.uf)}`,
          { cache: "no-store", signal: controller.signal },
        );

        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Erro ao carregar cidades do ERP");
        }

        const payload = (await response.json()) as unknown;
        if (controller.signal.aborted) return;
        setCityOptions(normalizeCityOptions(payload));
        setCityOptionsStatus("success");
      } catch (error) {
        if (
          controller.signal.aborted ||
          (error instanceof DOMException && error.name === "AbortError")
        ) {
          return;
        }
        setCityOptions([]);
        setCityOptionsStatus("error");
      }
    })();

    return () => controller.abort();
  }, [form.uf, formOpen, router]);

  useEffect(() => {
    if (!formOpen || !form.uf || !form.cidade) return;

    const controller = new AbortController();
    void (async () => {
      setRepresentativeOptionsStatus("loading");
      try {
        const params = new URLSearchParams({
          uf: form.uf,
          cidade: form.cidade,
        });
        const response = await fetch(
          `/api/admin/representantes/opcoes/representantes?${params.toString()}`,
          { cache: "no-store", signal: controller.signal },
        );

        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Erro ao carregar representantes do ERP");
        }

        const payload = (await response.json()) as unknown;
        if (controller.signal.aborted) return;
        setRepresentativeOptions(normalizeRepresentanteOptions(payload));
        setRepresentativeOptionsStatus("success");
      } catch (error) {
        if (
          controller.signal.aborted ||
          (error instanceof DOMException && error.name === "AbortError")
        ) {
          return;
        }
        setRepresentativeOptions([]);
        setRepresentativeOptionsStatus("error");
      }
    })();

    return () => controller.abort();
  }, [form.cidade, form.uf, formOpen, router]);

  const totals = useMemo(() => {
    const byUf = new Map<string, number>();
    for (const item of items) {
      byUf.set(item.uf, (byUf.get(item.uf) ?? 0) + 1);
    }
    return { total: items.length, byUf };
  }, [items]);

  const visibleCityOptions = useMemo(() => {
    if (!form.cidade || cityOptions.includes(form.cidade)) return cityOptions;
    return [form.cidade, ...cityOptions];
  }, [cityOptions, form.cidade]);

  const currentRepresentative = useMemo(
    () => formRepresentativeOption(form),
    [form],
  );

  const visibleRepresentativeOptions = useMemo(() => {
    if (!currentRepresentative) return representativeOptions;
    const hasCurrent = representativeOptions.some(
      (item) =>
        representanteOptionKey(item) ===
        representanteOptionKey(currentRepresentative),
    );
    return hasCurrent
      ? representativeOptions
      : [currentRepresentative, ...representativeOptions];
  }, [currentRepresentative, representativeOptions]);

  const isCurrentEditingRepresentative = useCallback(
    (option: ErpRepresentanteOption) =>
      Boolean(
        editing &&
          editing.uf === form.uf &&
          editing.cidade === form.cidade &&
          normalizeRepresentativeName(editing.nome) ===
            normalizeRepresentativeName(option.nome),
      ),
    [editing, form.cidade, form.uf],
  );

  const isRepresentativeUnavailable = useCallback(
    (option: ErpRepresentanteOption) =>
      Boolean(option.adicionado && !isCurrentEditingRepresentative(option)),
    [isCurrentEditingRepresentative],
  );

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setCitySearch("");
    setRepresentativeSearch("");
    setCityOptions([]);
    setCityOptionsStatus("idle");
    setRepresentativeOptions([]);
    setRepresentativeOptionsStatus("idle");
    setFormOpen(true);
    setActionMessage(null);
  }

  function openEdit(item: Representante) {
    setEditing(item);
    setForm({
      uf: item.uf,
      cidade: item.cidade,
      nome: item.nome,
      empresa: item.empresa ?? "",
      telefone: item.telefone ?? "",
      email: item.email ?? "",
    });
    setCitySearch(item.cidade);
    setRepresentativeSearch(
      representativeOptionLabel({
        nome: item.nome,
        empresa: item.empresa ?? "",
        telefone: item.telefone ?? "",
        email: item.email ?? "",
      }),
    );
    setCityOptions([]);
    setCityOptionsStatus(item.uf ? "loading" : "idle");
    setRepresentativeOptions([]);
    setRepresentativeOptionsStatus(item.uf && item.cidade ? "loading" : "idle");
    setFormOpen(true);
    setActionMessage(null);
  }

  function closeForm() {
    setFormOpen(false);
    setEditing(null);
    setForm(EMPTY_FORM);
    setCitySearch("");
    setRepresentativeSearch("");
    setCityOptions([]);
    setCityOptionsStatus("idle");
    setRepresentativeOptions([]);
    setRepresentativeOptionsStatus("idle");
  }

  function handleFormUfChange(uf: string) {
    setForm({
      ...EMPTY_FORM,
      uf,
    });
    setCitySearch("");
    setRepresentativeSearch("");
    setCityOptions([]);
    setCityOptionsStatus(uf ? "loading" : "idle");
    setRepresentativeOptions([]);
    setRepresentativeOptionsStatus("idle");
    setActionMessage(null);
  }

  function handleFormCidadeChange(cidade: string) {
    setCitySearch(cidade);
    setRepresentativeSearch("");
    setForm((prev) => ({
      ...prev,
      cidade,
      nome: "",
      empresa: "",
      telefone: "",
      email: "",
    }));
    setRepresentativeOptions([]);
    setRepresentativeOptionsStatus(cidade ? "loading" : "idle");
    setActionMessage(null);
  }

  function handleCitySearchChange(value: string) {
    setCitySearch(value);
    const option = visibleCityOptions.find((cidade) =>
      sameOptionText(cidade, value),
    );

    if (option) {
      if (!sameOptionText(option, form.cidade)) {
        handleFormCidadeChange(option);
      }
      return;
    }

    if (form.cidade) {
      setForm((prev) => ({
        ...prev,
        cidade: "",
        nome: "",
        empresa: "",
        telefone: "",
        email: "",
      }));
      setRepresentativeSearch("");
      setRepresentativeOptions([]);
      setRepresentativeOptionsStatus("idle");
    }
  }

  function applyRepresentanteOption(option: ErpRepresentanteOption) {
    setRepresentativeSearch(representativeOptionLabel(option));
    setError(null);
    setActionMessage(null);
    setForm((prev) => ({
      ...prev,
      nome: option.nome,
      empresa: option.empresa,
      telefone: option.telefone,
      email: option.email,
    }));
  }

  function handleRepresentanteSearchChange(value: string) {
    setRepresentativeSearch(value);
    const option = visibleRepresentativeOptions.find(
      (item) => sameOptionText(representativeOptionLabel(item), value),
    );

    if (!option) {
      if (form.nome) {
        setForm((prev) => ({
          ...prev,
          nome: "",
          empresa: "",
          telefone: "",
          email: "",
        }));
      }
      return;
    }

    if (isRepresentativeUnavailable(option)) {
      setError("Este representante ja esta adicionado nessa cidade");
      setRepresentativeSearch("");
      setForm((prev) => ({
        ...prev,
        nome: "",
        empresa: "",
        telefone: "",
        email: "",
      }));
      return;
    }

    applyRepresentanteOption(option);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setActionMessage(null);
    setError(null);

    if (!form.cidade.trim()) {
      setError("Selecione uma cidade da lista");
      setSubmitting(false);
      return;
    }

    if (!form.nome.trim()) {
      setError("Selecione um representante da lista");
      setSubmitting(false);
      return;
    }

    const payload = {
      uf: form.uf.trim().toUpperCase(),
      cidade: form.cidade.trim(),
      nome: form.nome.trim(),
      empresa: form.empresa.trim() || undefined,
      telefone: form.telefone.trim() || undefined,
      email: form.email.trim() || undefined,
    };

    try {
      const url = editing
        ? `/api/admin/representantes/${editing.id}`
        : "/api/admin/representantes";
      const method = editing ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { message?: string | string[]; error?: string }
          | null;
        const message = Array.isArray(body?.message)
          ? body.message.join(", ")
          : body?.message ?? body?.error ?? "Erro ao salvar";
        setError(message);
        return;
      }

      setActionMessage(editing ? "Representante atualizado" : "Representante criado");
      closeForm();
      await loadItems();
    } catch {
      setError("Erro de rede ao salvar");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(item: Representante) {
    if (
      !window.confirm(
        `Remover ${item.nome} da cidade ${item.cidade}/${item.uf}?`,
      )
    ) {
      return;
    }

    setError(null);
    setActionMessage(null);

    try {
      const response = await fetch(`/api/admin/representantes/${item.id}`, {
        method: "DELETE",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setError(body?.error ?? "Erro ao remover");
        return;
      }

      setActionMessage("Representante removido");
      await loadItems();
    } catch {
      setError("Erro de rede ao remover");
    }
  }

  async function handleSync() {
    if (
      !window.confirm(
        "Sincronizar dados com o ERP? Isso pode levar alguns minutos e atualizará registros existentes.",
      )
    ) {
      return;
    }

    setSyncing(true);
    setSyncMessage("Sincronizando com o ERP, aguarde...");
    setError(null);
    setActionMessage(null);

    try {
      const response = await fetch("/api/admin/representantes/sincronizar", {
        method: "POST",
      });

      if (response.status === 401) {
        router.replace("/admin/login");
        return;
      }

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setSyncMessage(null);
        setError(body?.error ?? "Erro ao sincronizar");
        return;
      }

      const result = (await response.json()) as SyncResult;
      setSyncMessage(
        `Sincronização concluída: ${result.created} criados, ${result.updated} atualizados, ${result.skipped} ignorados, ${result.failedCities.length} falhas.`,
      );
      await loadItems();
    } catch {
      setSyncMessage(null);
      setError("Erro de rede ao sincronizar");
    } finally {
      setSyncing(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 py-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-[#B11116]">
            Maza · Painel
          </span>
          <h1 className="text-2xl font-bold leading-tight text-[#181818] md:text-3xl">
            Representantes por cidade
          </h1>
          <p className="text-sm text-black/60">
            Cadastre, edite ou remova qual representante aparece em cada cidade
            no site.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center justify-center rounded-lg bg-[#B11116] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#920d12]"
          >
            Adicionar
          </button>
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="inline-flex items-center justify-center rounded-lg border border-[#181818] bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-[#181818] transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {syncing ? "Sincronizando..." : "Sincronizar do ERP"}
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black/70 transition hover:bg-black/5"
          >
            Sair
          </button>
        </div>
      </header>

      <div className="flex shrink-0 flex-col gap-2">
        {syncMessage ? (
          <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-800">
            {syncMessage}
          </div>
        ) : null}

        {actionMessage ? (
          <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm text-emerald-800">
            {actionMessage}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
            {error}
          </div>
        ) : null}
      </div>

      <section className="flex shrink-0 flex-wrap items-end gap-3 rounded-xl border border-black/10 bg-white p-4">
        <label className="flex min-w-[140px] flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/60">
            UF
          </span>
          <select
            value={filterUf}
            onChange={(event) => setFilterUf(event.target.value)}
            className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#B11116] focus:ring-2 focus:ring-[#B11116]/20"
          >
            <option value="">Todas</option>
            {BRAZIL_UFS.map((uf) => (
              <option key={uf} value={uf}>
                {uf}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-1 min-w-[220px] flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/60">
            Buscar
          </span>
          <input
            type="search"
            placeholder="Cidade, nome ou empresa"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#B11116] focus:ring-2 focus:ring-[#B11116]/20"
          />
        </label>

        <div className="ml-auto text-sm text-black/60">
          {loading ? "Carregando..." : `${totals.total} resultado(s)`}
        </div>
      </section>

      <section className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-black/10 bg-white">
        <div className="h-full min-h-0 w-full overflow-auto">
          <table className="min-w-[980px] w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-black/5 text-xs font-bold uppercase tracking-[0.12em] text-black/60">
              <tr>
                <th className="px-4 py-3">UF</th>
                <th className="px-4 py-3">Cidade</th>
                <th className="px-4 py-3">Representante</th>
                <th className="px-4 py-3">Empresa</th>
                <th className="px-4 py-3">Telefone</th>
                <th className="px-4 py-3">E-mail</th>
                <th className="px-4 py-3 text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-black/60">
                    Carregando...
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-black/60">
                    Nenhum representante cadastrado. Use{" "}
                    <strong>Sincronizar do ERP</strong> para popular a partir
                    dos dados atuais.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="border-t border-black/5">
                    <td className="px-4 py-3 font-bold">{item.uf}</td>
                    <td className="px-4 py-3">{item.cidade}</td>
                    <td className="px-4 py-3">{item.nome}</td>
                    <td className="px-4 py-3 text-black/70">
                      {item.empresa ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-black/70">
                      {item.telefone ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-black/70">
                      {item.email ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="rounded-md border border-black/15 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#181818] transition hover:bg-black/5"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="rounded-md border border-red-300 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-red-700 transition hover:bg-red-50"
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {formOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-h-[calc(100dvh-2rem)] w-full max-w-[520px] overflow-auto rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(17,17,17,0.25)]">
            <header className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-[#181818]">
                  {editing ? "Editar representante" : "Adicionar representante"}
                </h2>
                <p className="text-sm text-black/60">
                  Selecione a UF, a cidade e o representante carregados do ERP.
                </p>
              </div>
              <button
                type="button"
                onClick={closeForm}
                aria-label="Fechar"
                className="rounded-md border border-black/15 px-2 py-1 text-sm text-black/60 hover:bg-black/5"
              >
                ✕
              </button>
            </header>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-[120px_1fr]">
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/60">
                    UF
                  </span>
                  <select
                    required
                    value={form.uf}
                    onChange={(event) => handleFormUfChange(event.target.value)}
                    className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#B11116] focus:ring-2 focus:ring-[#B11116]/20"
                  >
                    <option value="" disabled>
                      Selecione
                    </option>
                    {BRAZIL_UFS.map((uf) => (
                      <option key={uf} value={uf}>
                        {uf}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/60">
                    Cidade
                  </span>
                  <input
                    required
                    type="search"
                    list="admin-city-options"
                    value={citySearch}
                    onChange={(event) =>
                      handleCitySearchChange(event.target.value)
                    }
                    disabled={!form.uf || cityOptionsStatus === "loading"}
                    placeholder={
                      !form.uf
                        ? "Selecione a UF"
                        : cityOptionsStatus === "loading"
                          ? "Carregando cidades..."
                          : "Digite para buscar"
                    }
                    className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#B11116] focus:ring-2 focus:ring-[#B11116]/20"
                  />
                  <datalist id="admin-city-options">
                    {visibleCityOptions.map((cidade) => (
                      <option key={cidade} value={cidade} />
                    ))}
                  </datalist>
                  {cityOptionsStatus === "error" ? (
                    <span className="text-xs text-red-700">
                      Erro ao carregar cidades
                    </span>
                  ) : null}
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/60">
                  Nome do representante
                </span>
                <input
                  required
                  type="search"
                  list="admin-representative-options"
                  value={representativeSearch}
                  onChange={(event) =>
                    handleRepresentanteSearchChange(event.target.value)
                  }
                  disabled={
                    !form.uf ||
                    !form.cidade ||
                    representativeOptionsStatus === "loading"
                  }
                  placeholder={
                    !form.cidade
                      ? "Selecione a cidade"
                      : representativeOptionsStatus === "loading"
                        ? "Carregando representantes..."
                        : "Digite para buscar"
                  }
                  className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#B11116] focus:ring-2 focus:ring-[#B11116]/20"
                />
                <datalist id="admin-representative-options">
                  {visibleRepresentativeOptions.map((option) => {
                    const key = representanteOptionKey(option);
                    const unavailable = isRepresentativeUnavailable(option);
                    return (
                      <option
                        key={key}
                        value={representativeOptionLabel(option)}
                        label={unavailable ? "ja adicionado" : undefined}
                      />
                    );
                  })}
                </datalist>
                {representativeOptionsStatus === "error" ? (
                  <span className="text-xs text-red-700">
                    Erro ao carregar representantes
                  </span>
                ) : null}
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/60">
                  Empresa
                </span>
                <input
                  type="text"
                  value={form.empresa}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      empresa: event.target.value,
                    }))
                  }
                  className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#B11116] focus:ring-2 focus:ring-[#B11116]/20"
                />
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/60">
                    Telefone
                  </span>
                  <input
                    type="text"
                    value={form.telefone}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        telefone: event.target.value,
                      }))
                    }
                    className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#B11116] focus:ring-2 focus:ring-[#B11116]/20"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-black/60">
                    E-mail
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      setForm((prev) => ({
                        ...prev,
                        email: event.target.value,
                      }))
                    }
                    className="rounded-md border border-black/15 bg-white px-3 py-2 text-sm outline-none focus:border-[#B11116] focus:ring-2 focus:ring-[#B11116]/20"
                  />
                </label>
              </div>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={submitting}
                  className="rounded-lg border border-black/15 bg-white px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-black/70 transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-lg bg-[#B11116] px-4 py-2 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#920d12] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Salvando..." : editing ? "Atualizar" : "Criar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
