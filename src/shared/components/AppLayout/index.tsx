import { ThemeProvider } from "../system/ThemeProvider";
import Navbar from "./Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="beshara-ui-theme">
      <Navbar />
      <main className="@container mt-24">{children}</main>
    </ThemeProvider>
  );
}
