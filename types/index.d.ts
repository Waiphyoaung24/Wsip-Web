export type PageProps<T = Record<string, never>> = {
  params: T;
  searchParams?: { [key: string]: string | string[] | undefined };
};


