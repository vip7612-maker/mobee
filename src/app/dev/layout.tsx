import { WorkspaceProvider } from "./workspace-context";
import { Sidebar } from "./sidebar";

export default function DevLayout({ children }: { children: React.ReactNode }) {
  return (
    <WorkspaceProvider>
      <div className="flex bg-ink-50/30">
        <Sidebar />
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </WorkspaceProvider>
  );
}
