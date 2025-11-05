"use client";

import { PencilSimple, Trash } from "phosphor-react";

interface AddressCardProps {
  alias: string;
  road: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  number: string;
  complement?: string;
  phone?: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function AddressCard({
  alias,
  road,
  neighborhood,
  city,
  state,
  zipCode,
  number,
  complement,
  phone,
  onEdit,
  onDelete,
}: AddressCardProps) {
  return (
    <div className="w-full flex justify-between border-2 border-[#F8F8F6] rounded-[10px] p-6 text-sm lg:max-w-[600px]">
      <div>
        <h4 className="font-medium text-[15px] text-black ">{alias}</h4>
        <p className="text-sm text-muted-foreground leading-relaxed py-5">
          {road?.toUpperCase()}, {number}
          {complement ? ` - ${complement.toUpperCase()}` : ""} –{" "}
          {neighborhood?.toUpperCase()},
          <br />
          {city?.toUpperCase()} – {state?.toUpperCase()}, CEP {zipCode}
          {phone && (
            <>
              <br />
              <span className="text-black">Telefone:</span>{" "}
              <span className="text-muted-foreground">{phone}</span>
            </>
          )}
        </p>
      </div>
      <div className="flex flex-col items-cente justify-between">
        <button
          onClick={onEdit}
          aria-label="Editar endereço"
          className="text-[#254AA5] hover:opacity-80 transition cursor-pointer"
        >
          <PencilSimple size={18} weight="bold" />
        </button>
        <button
          onClick={onDelete}
          aria-label="Excluir endereço"
          className="text-[#E04646] hover:opacity-80 transition cursor-pointer"
        >
          <Trash size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
