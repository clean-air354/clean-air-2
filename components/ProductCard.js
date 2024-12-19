import Link from 'next/link';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <Link href={`/products/${product._id}`}>
        <button>View Product</button>
      </Link>
    </div>
  );
};

export default ProductCard;
