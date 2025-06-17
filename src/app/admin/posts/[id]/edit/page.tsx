import AdminEditPostPage from './AdminEditPostPage';

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminEditPostPage id={id} />;
}
