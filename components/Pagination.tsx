export const Pagination = () => {
  const pages = [1, 2, 3, 4, 5];
  return (
    <div>
      {pages?.map((page) => (
        <button key={page}>{page}</button>
      ))}
    </div>
  );
};
