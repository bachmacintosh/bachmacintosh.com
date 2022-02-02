export default function Warning({ title, children, },) {
  return(
    <div className="bg-orange-700 border-l-4 border-orange-500 text-orange-300 p-4" role="alert">
      <span className="font-bold text-orange-300">{title}</span>
      <p>{children}</p>
    </div>
  );
}
