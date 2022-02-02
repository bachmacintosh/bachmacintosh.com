export function SmallButtonLink ({ href, children, },) {
  return (
    <a className="bg-blue-ultra text-white active:bg-blue-diamond font-bold
    uppercase px-4 py-2 rounded shadow
    hover:shadow-md outline-none focus:outline-none mr-1 mb-1
    ease-linear transition-all duration-150" type="button"
    href={href} target="_blank" rel="nofollow noreferrer noopener">
      {children}
    </a>
  );
}
