import Footer from "@/components/Footer";
import HeaderHybrid from "@/components/HeaderHybrid";
import ProjectList from "@/components/ProjectList";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeaderHybrid />
      <main className="relative">
        <ProjectList />
      </main>
      <Footer />
    </div>
  );
}
