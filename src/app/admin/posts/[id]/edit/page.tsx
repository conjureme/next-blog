import AdminEditPostPage from './AdminEditPostPage';

export default function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return <AdminEditPostPage params={params} />;
}
