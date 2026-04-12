"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { formatPriceDramDisplay, stripDramForEdit } from "@/lib/format-price";

type ProductRow = {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  imageUrls: string[];
};

type WorkRow = {
  id: string;
  title: string;
  description: string | null;
  imageUrls: string[];
};

type ReviewRow = {
  id: string;
  content: string;
  author: string | null;
  rating: number | null;
  workId: string | null;
  createdAt: string;
  work: { id: string; title: string } | null;
};

type ServiceRow = {
  id: string;
  title: string;
  description: string | null;
  price: string | null;
  imageUrls: string[];
  sortOrder: number;
};

type OfferRow = {
  id: string;
  phone: string;
  email: string;
  comment: string | null;
  createdAt: string;
};

type EmailSubscriptionRow = {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const j = (await res.json().catch(() => ({}))) as { error?: string; url?: string };
  if (!res.ok) {
    throw new Error(typeof j.error === "string" ? j.error : "Վերբեռնումը ձախողվեց");
  }
  if (typeof j.url !== "string") {
    throw new Error("Անսպասելի պատասխան");
  }
  return j.url;
}

function ImageUrlsField({
  label,
  urls,
  onChange,
  disabled,
}: {
  label: string;
  urls: string[];
  onChange: (next: string[]) => void;
  disabled?: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [localErr, setLocalErr] = useState<string | null>(null);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    setLocalErr(null);
    setBusy(true);
    try {
      const next = [...urls];
      for (const f of Array.from(files)) {
        const url = await uploadImage(f);
        next.push(url);
      }
      onChange(next);
    } catch (err) {
      setLocalErr(err instanceof Error ? err.message : "Սխալ");
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-gray-800">{label}</span>
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        disabled={disabled || busy}
        onChange={onPick}
        className="block w-full text-sm text-gray-800 file:mr-3 file:rounded file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-sm file:text-blue-700"
      />
      {localErr ? (
        <p className="text-sm text-red-600">{localErr}</p>
      ) : busy ? (
        <p className="text-sm text-gray-600">Վերբեռնում…</p>
      ) : null}
      {urls.length > 0 ? (
        <ul className="flex flex-wrap gap-2 mt-2">
          {urls.map((url, i) => (
            <li
              key={`${url}-${i}`}
              className="relative group rounded-lg border border-gray-200 overflow-hidden w-20 h-20 bg-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                disabled={disabled || busy}
                onClick={() => onChange(urls.filter((_, idx) => idx !== i))}
                className="absolute inset-0 bg-black/40 text-white text-xs opacity-0 group-hover:opacity-100 transition"
              >
                Հեռացնել
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState<
    "services" | "products" | "works" | "reviews" | "offers" | "subscriptions"
  >("services");

  if (status === "loading") {
    return (
      <div className="p-10 text-gray-900 bg-gray-50 min-h-screen">Բեռնում…</div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
        <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">
            Ադմինիստրատորի մուտք
          </h2>
          <p className="text-gray-600 mb-6">Մուտք գործեք կամ գրանցվեք</p>
          <button
            type="button"
            onClick={() => signIn()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Մուտք / Գրանցում
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-gray-900">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Ադմին վահանակ</h1>
        <button
          type="button"
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Դուրս գալ
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          type="button"
          onClick={() => setTab("services")}
          className={`px-4 py-2 rounded border transition ${
            tab === "services"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Ծառայություններ
        </button>
        <button
          type="button"
          onClick={() => setTab("products")}
          className={`px-4 py-2 rounded border transition ${
            tab === "products"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Ապրանքներ
        </button>
        <button
          type="button"
          onClick={() => setTab("works")}
          className={`px-4 py-2 rounded border transition ${
            tab === "works"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Նախագծեր
        </button>
        <button
          type="button"
          onClick={() => setTab("reviews")}
          className={`px-4 py-2 rounded border transition ${
            tab === "reviews"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Կարծիքներ
        </button>
        <button
          type="button"
          onClick={() => setTab("offers")}
          className={`px-4 py-2 rounded border transition ${
            tab === "offers"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Առաջարկների հայտեր
        </button>
        <button
          type="button"
          onClick={() => setTab("subscriptions")}
          className={`px-4 py-2 rounded border transition ${
            tab === "subscriptions"
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
          }`}
        >
          Էլ․ բաժանորդագրություն
        </button>
      </div>

      {tab === "services" ? (
        <ServicesPanel />
      ) : tab === "products" ? (
        <ProductsPanel />
      ) : tab === "works" ? (
        <WorksPanel />
      ) : tab === "reviews" ? (
        <ReviewsPanel />
      ) : tab === "offers" ? (
        <OffersPanel />
      ) : (
        <EmailSubscriptionsPanel />
      )}
    </div>
  );
}

function ServicesPanel() {
  const [items, setItems] = useState<ServiceRow[]>([]);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoadErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/services");
      const j = (await res.json()) as ServiceRow[] | { error?: string };
      if (!res.ok) {
        throw new Error(typeof (j as { error?: string }).error === "string" ? (j as { error: string }).error : "Սխալ");
      }
      setItems(j as ServiceRow[]);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "Չհաջողվեց բեռնել");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setSortOrder(0);
    setImageUrls([]);
    setFormErr(null);
  };

  const startEdit = (s: ServiceRow) => {
    setEditingId(s.id);
    setTitle(s.title);
    setDescription(s.description ?? "");
    setPrice(stripDramForEdit(s.price));
    setSortOrder(s.sortOrder);
    setImageUrls([...s.imageUrls]);
    setFormErr(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr(null);
    const t = title.trim();
    if (!t) {
      setFormErr("Անվանումը պարտադիր է");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/admin/services/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: t,
            description: description.trim() || null,
            price: stripDramForEdit(price) || null,
            imageUrls,
            sortOrder,
          }),
        });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            typeof (j as { error?: string }).error === "string"
              ? (j as { error: string }).error
              : "Չհաջողվեց",
          );
        }
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: t,
            description: description.trim() || null,
            price: stripDramForEdit(price) || null,
            imageUrls,
            sortOrder,
          }),
        });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(typeof (j as { error?: string }).error === "string" ? (j as { error: string }).error : "Չհաջողվեց");
        }
      }
      resetForm();
      await load();
    } catch (err) {
      setFormErr(err instanceof Error ? err.message : "Սխալ");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Ջնջե՞լ այս ծառայությունը")) return;
    const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(typeof j.error === "string" ? j.error : "Չհաջողվեց ջնջել");
      return;
    }
    if (editingId === id) resetForm();
    await load();
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-xl shadow border border-gray-100 space-y-4 max-w-2xl"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          {editingId ? "Խմբագրել ծառայություն" : "Նոր ծառայություն"}
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Անվանում</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Դասավորություն (թիվ)</label>
          <input
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value) || 0)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
          />
          <p className="text-xs text-gray-500 mt-1">Փոքր թիվը ցուցադրվում է առաջ</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Գին</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="֏ 100 000 / պայմանագրային"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Նկարագրություն</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
          />
        </div>
        <ImageUrlsField
          label="Պատկերներ (R2)"
          urls={imageUrls}
          onChange={setImageUrls}
          disabled={saving}
        />
        {formErr ? <p className="text-sm text-red-600">{formErr}</p> : null}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Պահպանում…" : editingId ? "Պահպանել" : "Ավելացնել"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Չեղարկել
            </button>
          ) : null}
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Բոլոր ծառայությունները</h3>
        {loading ? (
          <p className="text-gray-600">Բեռնում…</p>
        ) : loadErr ? (
          <p className="text-red-600">{loadErr}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow border border-gray-100"
              >
                <div className="flex gap-3">
                  {item.imageUrls[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrls[0]}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500">Դասավորություն: {item.sortOrder}</p>
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{formatPriceDramDisplay(item.price)}</p>
                    {item.description ? (
                      <p className="text-gray-700 text-sm mt-1 line-clamp-2">{item.description}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="text-sm bg-gray-100 text-gray-900 px-3 py-1 rounded hover:bg-gray-200"
                  >
                    Խմբագրել
                  </button>
                  <button
                    type="button"
                    onClick={() => void onDelete(item.id)}
                    className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100"
                  >
                    Ջնջել
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductsPanel() {
  const [items, setItems] = useState<ProductRow[]>([]);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoadErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/products");
      const j = (await res.json()) as ProductRow[] | { error?: string };
      if (!res.ok) {
        throw new Error(typeof (j as { error?: string }).error === "string" ? (j as { error: string }).error : "Սխալ");
      }
      setItems(j as ProductRow[]);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "Չհաջողվեց բեռնել");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setPrice("");
    setImageUrls([]);
    setFormErr(null);
  };

  const startEdit = (p: ProductRow) => {
    setEditingId(p.id);
    setTitle(p.title);
    setDescription(p.description ?? "");
    setPrice(stripDramForEdit(p.price));
    setImageUrls([...p.imageUrls]);
    setFormErr(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr(null);
    const t = title.trim();
    if (!t) {
      setFormErr("Անվանումը պարտադիր է");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/admin/products/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: t,
            description: description.trim() || null,
            price: stripDramForEdit(price) || null,
            imageUrls,
          }),
        });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(
            typeof (j as { error?: string }).error === "string"
              ? (j as { error: string }).error
              : "Չհաջողվեց",
          );
        }
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: t,
            description: description.trim() || null,
            price: stripDramForEdit(price) || null,
            imageUrls,
          }),
        });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(typeof (j as { error?: string }).error === "string" ? (j as { error: string }).error : "Չհաջողվեց");
        }
      }
      resetForm();
      await load();
    } catch (err) {
      setFormErr(err instanceof Error ? err.message : "Սխալ");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Ջնջե՞լ այս ապրանքը")) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(typeof j.error === "string" ? j.error : "Չհաջողվեց ջնջել");
      return;
    }
    if (editingId === id) resetForm();
    await load();
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-xl shadow border border-gray-100 space-y-4 max-w-2xl"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          {editingId ? "Խմբագրել ապրանք" : "Նոր ապրանք"}
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Անվանում</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Գին</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="֏ 100 000"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Նկարագրություն</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
          />
        </div>
        <ImageUrlsField
          label="Պատկերներ (R2)"
          urls={imageUrls}
          onChange={setImageUrls}
          disabled={saving}
        />
        {formErr ? <p className="text-sm text-red-600">{formErr}</p> : null}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Պահպանում…" : editingId ? "Պահպանել" : "Ավելացնել"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Չեղարկել
            </button>
          ) : null}
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Բոլոր ապրանքները</h3>
        {loading ? (
          <p className="text-gray-600">Բեռնում…</p>
        ) : loadErr ? (
          <p className="text-red-600">{loadErr}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow border border-gray-100"
              >
                <div className="flex gap-3">
                  {item.imageUrls[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrls[0]}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{formatPriceDramDisplay(item.price)}</p>
                    {item.description ? (
                      <p className="text-gray-700 text-sm mt-1 line-clamp-2">{item.description}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="text-sm bg-gray-100 text-gray-900 px-3 py-1 rounded hover:bg-gray-200"
                  >
                    Խմբագրել
                  </button>
                  <button
                    type="button"
                    onClick={() => void onDelete(item.id)}
                    className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100"
                  >
                    Ջնջել
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function WorksPanel() {
  const [items, setItems] = useState<WorkRow[]>([]);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [formErr, setFormErr] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoadErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/works");
      const j = (await res.json()) as WorkRow[] | { error?: string };
      if (!res.ok) {
        throw new Error(typeof (j as { error?: string }).error === "string" ? (j as { error: string }).error : "Սխալ");
      }
      setItems(j as WorkRow[]);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "Չհաջողվեց բեռնել");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setImageUrls([]);
    setFormErr(null);
  };

  const startEdit = (w: WorkRow) => {
    setEditingId(w.id);
    setTitle(w.title);
    setDescription(w.description ?? "");
    setImageUrls([...w.imageUrls]);
    setFormErr(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr(null);
    const t = title.trim();
    if (!t) {
      setFormErr("Անվանումը պարտադիր է");
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        const res = await fetch(`/api/admin/works/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: t,
            description: description.trim() || null,
            imageUrls,
          }),
        });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(typeof (j as { error?: string }).error === "string" ? (j as { error: string }).error : "Չհաջողվեց");
        }
      } else {
        const res = await fetch("/api/admin/works", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: t,
            description: description.trim() || null,
            imageUrls,
          }),
        });
        const j = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(typeof (j as { error?: string }).error === "string" ? (j as { error: string }).error : "Չհաջողվեց");
        }
      }
      resetForm();
      await load();
    } catch (err) {
      setFormErr(err instanceof Error ? err.message : "Սխալ");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm("Ջնջե՞լ այս գրառումը")) return;
    const res = await fetch(`/api/admin/works/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(typeof j.error === "string" ? j.error : "Չհաջողվեց ջնջել");
      return;
    }
    if (editingId === id) resetForm();
    await load();
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-xl shadow border border-gray-100 space-y-4 max-w-2xl"
      >
        <h2 className="text-lg font-semibold text-gray-900">
          {editingId ? "Խմբագրել աշխատանք" : "Նոր աշխատանք"}
        </h2>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Անվանում</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-1">Նկարագրություն</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
          />
        </div>
        <ImageUrlsField
          label="Պատկերներ (R2)"
          urls={imageUrls}
          onChange={setImageUrls}
          disabled={saving}
        />
        {formErr ? <p className="text-sm text-red-600">{formErr}</p> : null}
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Պահպանում…" : editingId ? "Պահպանել" : "Ավելացնել"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Չեղարկել
            </button>
          ) : null}
        </div>
      </form>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Բոլոր նախագծերը</h3>
        {loading ? (
          <p className="text-gray-600">Բեռնում…</p>
        ) : loadErr ? (
          <p className="text-red-600">{loadErr}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl shadow border border-gray-100"
              >
                <div className="flex gap-3">
                  {item.imageUrls[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.imageUrls[0]}
                      alt=""
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                  ) : null}
                  <div className="min-w-0">
                    <h4 className="font-semibold text-gray-900">{item.title}</h4>
                    {item.description ? (
                      <p className="text-gray-700 text-sm mt-1 line-clamp-3">{item.description}</p>
                    ) : null}
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
                    className="text-sm bg-gray-100 text-gray-900 px-3 py-1 rounded hover:bg-gray-200"
                  >
                    Խմբագրել
                  </button>
                  <button
                    type="button"
                    onClick={() => void onDelete(item.id)}
                    className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100"
                  >
                    Ջնջել
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function OffersPanel() {
  const [items, setItems] = useState<OfferRow[]>([]);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoadErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/offers");
      const j = (await res.json()) as OfferRow[] | { error?: string };
      if (!res.ok) {
        throw new Error(
          typeof (j as { error?: string }).error === "string"
            ? (j as { error: string }).error
            : "Սխալ",
        );
      }
      setItems(j as OfferRow[]);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "Չհաջողվեց բեռնել");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onDelete = async (id: string) => {
    if (!confirm("Ջնջե՞լ այս հայտը")) return;
    const res = await fetch(`/api/admin/offers/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(typeof j.error === "string" ? j.error : "Չհաջողվեց ջնջել");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Ստանալ առաջարկ — հայտեր</h2>
        <button
          type="button"
          onClick={() => void load()}
          className="text-sm bg-white border border-gray-200 text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          Թարմացնել
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Բեռնում…</p>
      ) : loadErr ? (
        <p className="text-red-600">{loadErr}</p>
      ) : items.length === 0 ? (
        <p className="text-gray-600">Դեռ հայտեր չկան։</p>
      ) : (
        <div className="space-y-4 max-w-4xl">
          {items.map((o) => (
            <article
              key={o.id}
              className="bg-white p-5 rounded-xl shadow border border-gray-100 border-l-4 border-l-[#49BBBD]"
            >
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Հեռախոս</p>
                  <p className="font-medium text-gray-900 mt-0.5">
                    <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="hover:underline">
                      {o.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Էլ. փոստ</p>
                  <p className="font-medium text-gray-900 mt-0.5">
                    <a href={`mailto:${o.email}`} className="text-blue-700 hover:underline break-all">
                      {o.email}
                    </a>
                  </p>
                </div>
                <div className="w-full sm:w-auto sm:ml-auto sm:text-right">
                  <p className="text-xs text-gray-500">Ամսաթիվ</p>
                  <p className="text-gray-600 mt-0.5">
                    {new Date(o.createdAt).toLocaleString("hy-AM", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
              {o.comment ? (
                <p className="mt-4 text-gray-800 text-sm whitespace-pre-wrap leading-relaxed border-t border-gray-100 pt-4">
                  {o.comment}
                </p>
              ) : null}
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => void onDelete(o.id)}
                  className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100"
                >
                  Ջնջել
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function EmailSubscriptionsPanel() {
  const [items, setItems] = useState<EmailSubscriptionRow[]>([]);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoadErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/email-subscriptions");
      const j = (await res.json()) as EmailSubscriptionRow[] | { error?: string };
      if (!res.ok) {
        throw new Error(
          typeof (j as { error?: string }).error === "string"
            ? (j as { error: string }).error
            : "Սխալ",
        );
      }
      setItems(j as EmailSubscriptionRow[]);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "Չհաջողվեց բեռնել");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onDelete = async (id: string) => {
    if (!confirm("Ջնջե՞լ այս բաժանորդագրությունը")) return;
    const res = await fetch(`/api/admin/email-subscriptions/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(typeof j.error === "string" ? j.error : "Չհաջողվեց ջնջել");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Էլ․ փոստի բաժանորդներ</h2>
        <button
          type="button"
          onClick={() => void load()}
          className="text-sm bg-white border border-gray-200 text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          Թարմացնել
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Բեռնում…</p>
      ) : loadErr ? (
        <p className="text-red-600">{loadErr}</p>
      ) : items.length === 0 ? (
        <p className="text-gray-600">Դեռ բաժանորդներ չկան։</p>
      ) : (
        <div className="overflow-x-auto max-w-3xl rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-700 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Էլ․ հասցե</th>
                <th className="px-4 py-3 font-semibold">Վերջին թարմացում</th>
                <th className="px-4 py-3 font-semibold w-24"> </th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">
                    <a href={`mailto:${row.email}`} className="text-blue-700 hover:underline break-all">
                      {row.email}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {new Date(row.updatedAt).toLocaleString("hy-AM", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => void onDelete(row.id)}
                      className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded hover:bg-red-100"
                    >
                      Ջնջել
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function ReviewsPanel() {
  const [items, setItems] = useState<ReviewRow[]>([]);
  const [loadErr, setLoadErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoadErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/reviews");
      const j = (await res.json()) as ReviewRow[] | { error?: string };
      if (!res.ok) {
        throw new Error(
          typeof (j as { error?: string }).error === "string"
            ? (j as { error: string }).error
            : "Սխալ",
        );
      }
      setItems(j as ReviewRow[]);
    } catch (e) {
      setLoadErr(e instanceof Error ? e.message : "Չհաջողվեց բեռնել");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const onDelete = async (id: string) => {
    if (!confirm("Ջնջե՞լ այս կարծիքը")) return;
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const j = (await res.json().catch(() => ({}))) as { error?: string };
      alert(typeof j.error === "string" ? j.error : "Չհաջողվեց ջնջել");
      return;
    }
    await load();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">Հաճախորդի կարծիքներ</h2>
        <button
          type="button"
          onClick={() => void load()}
          className="text-sm bg-white border border-gray-200 text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          Թարմացնել
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Բեռնում…</p>
      ) : loadErr ? (
        <p className="text-red-600">{loadErr}</p>
      ) : items.length === 0 ? (
        <p className="text-gray-600">Դեռ կարծիքներ չկան։</p>
      ) : (
        <div className="space-y-4 max-w-4xl">
          {items.map((r) => (
            <article
              key={r.id}
              className="bg-white p-5 rounded-xl shadow border border-gray-100 border-l-4 border-l-orange-400"
            >
              <p className="text-gray-900 whitespace-pre-wrap text-sm leading-relaxed">{r.content}</p>
              <div className="mt-4 flex flex-wrap items-end justify-between gap-3 text-sm">
                <div className="text-gray-700">
                  <p className="font-medium text-gray-900">{r.author || "Անանուն"}</p>
                  <p className="text-gray-500 text-xs mt-0.5">
                    {new Date(r.createdAt).toLocaleString("hy-AM", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  {r.work ? (
                    <p className="text-gray-600 text-xs mt-1">
                      Նախագիծ՝ <span className="font-medium">{r.work.title}</span>
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="text-orange-500 tabular-nums"
                    title={r.rating != null ? `${r.rating}/5` : undefined}
                  >
                    {r.rating != null ? "★".repeat(r.rating) + "☆".repeat(5 - r.rating) : "—"}
                  </span>
                  <button
                    type="button"
                    onClick={() => void onDelete(r.id)}
                    className="text-sm bg-red-50 text-red-700 px-3 py-1 rounded hover:bg-red-100"
                  >
                    Ջնջել
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
