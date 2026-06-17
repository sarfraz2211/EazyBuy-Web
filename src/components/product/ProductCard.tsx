interface Props {

  product: any;
}

export default function ProductCard({
  product,
}: Props) {

  return (

    <div className="product-card">

      <img
        src={product.image}
        alt={product.productName}
      />

      <h3>
        {product.productName}
      </h3>

      <p>
        ₹{product.price}
      </p>

      <button>
        Add To Cart
      </button>

    </div>
  );
}