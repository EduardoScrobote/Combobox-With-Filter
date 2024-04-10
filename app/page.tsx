import ComboBox from "@/components/ComboBox";

import { Countrys } from "@/data/countryData";

export default function Home() {
  return (
    <div className="w-full h-screen bg-[#f8fafc] flex">
      <ComboBox Countrys={Countrys} />
    </div>
  );
}
