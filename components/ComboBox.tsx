"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { ChevronRightIcon } from "@heroicons/react/24/outline";

import { Countrys } from "@/data/countryData";

export default function Home() {
  // states
  const [openComboBox, setOpenComboBox] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // functions
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const selectedItems = data.countries
      .map((isChecked: boolean, index: number) =>
        isChecked ? Countrys[index].id : null
      )
      .filter((id: number | null) => id !== null);

    console.log(selectedItems);
  };

  // Abre a ComboBox
  const handleComboBox = () => {
    setOpenComboBox(!openComboBox);
  };

  // seleciona e desceleciona todos os locais(planos de saude)
  const handleSelectAll = () => {
    if (selectedItems.length === Countrys.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(Countrys.map((country) => country.id.toString()));
    }

    // Desmarcar todos os checkboxes individualmente
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = selectedItems.length !== Countrys.length;
    });
  };

  //Atualiza a lista de itens baseado no filtro
  useEffect(() => {
    const selectedItemsNames = selectedItems;
    setValue("countries", selectedItemsNames);
  }, [selectedItems, setValue]);
  const filteredItems = Countrys.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[420px] h-screen bg-[#f8fafc] flex">
      <div className="w-full h-screen flex flex-col bg-[#f8f9fa]">
        <div
          onClick={handleComboBox}
          className="w-[full] rounded-lg h-16 ml-32 mt-32  hover:cursor-pointer text-black flex items-center p-2 font-bold bg-white"
        >
          <h1 className="text-lg">Select Location(s) </h1>
          <ChevronRightIcon
            width={20}
            className="duration-300"
            style={{
              marginLeft: "16px",
              rotate: `${openComboBox ? "90deg" : "0deg"}`,
            }}
          />
        </div>
        {openComboBox ? (
          <div className="w-[full] max-h-[550px] rounded-lg p-4 ml-32 mt-2 shadow-xl bg-white">
            <div className="w-full flex mb-2 flex-col justify-start items-start p-1">
              <input
                type="text"
                placeholder="Procurar"
                className="w-[100%] hover:ring-2 focus:ring-2 h-10 outline-none p-2 rounded-lg bg-[#f8f9fa]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="flex w-full mt-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedItems.length === Countrys.length}
                />
                <label className="ml-2 font-semibold text-lg">
                  Selecionar todos
                </label>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col max-h-[400px] scrollbar-thin overflow-hidden overflow-y-scroll">
                {filteredItems.map((prop, i) => (
                  <div
                    key={i}
                    className="w-full mt-1 font-semibold text-lg flex p-1 items-center"
                  >
                    <input
                      type="checkbox"
                      {...register(`countries[${prop.id}]`)}
                    />
                    <label className="ml-2">{prop.name}</label>
                  </div>
                ))}
              </div>
              <button type="submit">Test</button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
}
