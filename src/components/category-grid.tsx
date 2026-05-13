import Link from "next/link";
import { categories } from "@/data/categories";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/agents?category=${cat.id}`}
          className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white border border-ink-100 hover:border-ink-900 hover:shadow-md hover:-translate-y-0.5 transition-all"
        >
          <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform">
            {cat.emoji}
          </span>
          <span className="text-xs md:text-sm font-semibold text-center text-ink-800 leading-tight">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
