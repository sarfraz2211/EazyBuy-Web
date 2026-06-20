import Link from "next/link";
import type { Product } from "@/src/models/Product";

interface Props { product: Product }

// Links a product preview to its full details page.
export default function ProductCard({ product }: Props) {
  return (
    <article className="product-card">
      <Link href={`/product/${encodeURIComponent(product._id)}`} className="product-card-link">
        <div className="product-image-wrap">
          <img src={product.image || "/product-placeholder.svg"} alt={product.productName} />
          <span className="product-badge">Popular</span>
        </div>
        <h3>{product.productName}</h3>
        <div className="product-rating"><span>★ 4.3</span> <small>(128)</small></div>
        <p className="product-price">₹{Number(product.price).toLocaleString("en-IN")}</p>
        <span className="view-product-button">View details <span>→</span></span>
      </Link>
    </article>
  );
}
