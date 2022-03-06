import { useRouter, } from "next/router";

export default function PageSelector ({ page, pageCount, scroll, },) {
  const router = useRouter();
  const pageSelectors = [];
  for (let pageIdx = 1; pageIdx <= pageCount; pageIdx++) {
    pageSelectors.push(
      <option selected={pageIdx.toString() === page}>{pageIdx}</option>,
    );
  }
  const onSelectChange = (event,) => {
    const newPage = event.target.value;
    router.push(newPage, newPage, { scroll, },);
  };
  return (
    <div>
      <label htmlFor="page" className="block text-sm font-medium text-white">
        {`Page (out of ${pageCount}):`}
      </label>
      <div className="w-20">
        <select
          id="page"
          name="page"
          className="bg-blue-ultra text-white mt-1 block w-full pl-3 pr-10 py-2
        text-base border-blue-diamond focus:outline-none focus:ring-blue-diamond
        focus:border-blue-diamond sm:text-sm rounded-md text-center"
          onChange={onSelectChange}
        >
          {pageSelectors}
        </select>
      </div>
    </div>
  );
}
