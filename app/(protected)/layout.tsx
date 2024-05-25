import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <ConfigureAmplifyClientSide />
      {children}
      <Footer />
    </div>
  );
}
