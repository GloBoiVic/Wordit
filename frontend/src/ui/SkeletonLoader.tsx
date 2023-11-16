import { Skeleton } from '@nextui-org/react';

function SkeletonLoader() {
  return (
    <div className="grid flex-1 gap-2 px-2 py-4 mx-3 overflow-auto lg:grid-cols-3 xl:grid-cols-4 auto-rows-min lg:mx-0 sm:grid-cols-2 min-w-fit sm:max-w-fit">
      <Skeleton className="w-[15rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-secondary"></Skeleton>
      <Skeleton className="w-[15rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-secondary"></Skeleton>
      <Skeleton className="w-[15rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-secondary"></Skeleton>
      <Skeleton className="w-[15rem] h-[12rem] bg-secondary rounded-md shadow-md border-slate-200 dark:border-secondary"></Skeleton>
    </div>
  );
}

export default SkeletonLoader;
