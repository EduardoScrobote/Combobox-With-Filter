"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { CountriesType } from "@/data/countryData";

interface ComboBoxProps {
  Countrys: CountriesType;
}

export default function Home({ Countrys }: ComboBoxProps) {
  // states
  const [openComboBox, setOpenComboBox] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [empity, setEmpity] = useState<boolean>(false);
  const [selectedCountryName, setSelectedCountryName] = useState<string>("");

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

    if (selectedItems.length === 0) {
      setEmpity(true);
    } else {
      setEmpity(false);
    }
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = e.target.value;
    const item = Countrys.find((country) => country.id.toString() === itemId);
    if (item) {
      if (e.target.checked) {
        setSelectedCountryName((prev) => prev + " " + item.name);
      } else {
        setSelectedCountryName((prev) =>
          prev.replace(new RegExp(` ${item.name}`, "g"), "")
        );
      }
    }
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
      <div className="w-full h-screen flex flex-col ml-32 mt-32 bg-[#f8f9fa]">
        <h1
          className={
            empity ? "text-md text-red-600 mt-2 mb-2" : "text-md mt-2 mb-2"
          }
        >
          Planos de saúde
        </h1>
        <div
          onClick={handleComboBox}
          className={
            empity
              ? "w-[full] rounded-lg h-12 hover:cursor-pointer flex items-center gap-[128px] text-red-500 justify-around font-bold bg-red-200 border border-1 border-red-600"
              : "w-[full] rounded-lg h-12 hover:cursor-pointer flex items-center border border-1 border-slate-200 gap-[128px] justify-around font-bold bg-white"
          }
        >
          {selectedCountryName ? (
            <h1 className="text-sm max-w-[250px] max-h-[46px] font-normal overflow-hidden">
              {selectedCountryName}
            </h1>
          ) : (
            <h1 className="text-md font-normal">Selecione</h1>
          )}
          <ChevronRightIcon
            width={20}
            className="duration-300"
            style={{
              rotate: `${openComboBox ? "90deg" : "0deg"}`,
            }}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {openComboBox ? (
            <div
              className={
                "w-[full] max-h-[350px] rounded-lg p-4 mt-1 shadow-xl bg-white"
              }
            >
              <div className="w-full flex mb-2 flex-col justify-start items-start p-1">
                <button
                  onClick={() => setSelectedCountryName("")}
                  className="bg-red-400 hover:scale-105 duration-100 hover:bg-red-500 w-[25%] rounded-lg mb-2"
                >
                  Limpar
                </button>
                <input
                  type="text"
                  placeholder="Procurar"
                  className="w-full hover:ring-2 focus:ring-2 h-10 outline-none p-2 rounded-lg bg-[#f8f9fa]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex w-full mt-4">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedItems.length === Countrys.length}
                  />
                  <label className="ml-2  text-lg">Selecionar todos</label>
                </div>
              </div>
              <div className="flex flex-col max-h-[200px] scrollbar-thin overflow-hidden overflow-y-scroll">
                {filteredItems.map((prop, i) => (
                  <div
                    key={i}
                    className="w-full mt-1  text-lg flex p-1 items-center"
                  >
                    <input
                      type="checkbox"
                      {...register(`countries[${prop.id}]`)}
                      onChange={() => {
                        setSelectedCountryName(
                          (prev) => prev + " " + prop.name
                        ),
                          console.log(selectedCountryName);
                      }}
                    />
                    <label className="ml-2">{prop.name}</label>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {empity ? (
            <h1 className="mt-2 mb-2 text-red-700">Campo obrigatório</h1>
          ) : null}
          <button
            type="submit"
            className="bg-[rgb(29,78,216)] text-white w-full p-4 rounded-lg mt-4 hover:bg-[rgba(29,79,216,0.82)]"
          >
            Test
          </button>
        </form>
      </div>
    </div>
  );
}
