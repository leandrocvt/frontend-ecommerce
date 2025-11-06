"use client";

import { Loader2 } from "lucide-react";
import { useUserProfileQuery } from "@/hooks/user";
import { SectionHeader } from "@/components";
import { AddressCard } from "@/components";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddressForm } from "../_components";
import { AddressSchemaFormValues } from "@/types/address";
import { Modal, ConfirmDialog } from "@/components/ui";
import {
  useAddAddressMutate,
  useUpdateAddressMutate,
  useDeleteAddressMutate,
} from "@/hooks/address";
import { AddressUserProfile } from "@/types/user";

export default function MyAddressesPage() {
  const { data, isLoading, isError } = useUserProfileQuery();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAddress, setSelectedAddress] =
    useState<AddressSchemaFormValues>();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  const { mutate: addAddress, isPending: isAdding } = useAddAddressMutate();
  const { mutate: updateAddress, isPending: isUpdating } =
    useUpdateAddressMutate();
  const { mutate: deleteAddress, isPending: isDeleting } =
    useDeleteAddressMutate();

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) router.replace("/login");
  }, [router]);

  if (!isClient || isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-muted-foreground" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="text-center text-sm text-muted-foreground">
        Erro ao carregar endereços.
      </div>
    );
  }

  const addresses = data.addresses ?? [];
  const handleAddAddress = () => {
    setSelectedAddress(undefined);
    setOpenModal(true);
  };

  const handleEditAddress = (address: AddressSchemaFormValues) => {
    setSelectedAddress(address);
    setOpenModal(true);
  };

  const handleSubmitAddress = (formData: AddressSchemaFormValues) => {
    if (selectedAddress?.id) {
      updateAddress(
        {
          addressId: selectedAddress.id,
          data: formData as Omit<AddressUserProfile, "id">,
        },
        {
          onSuccess: () => setOpenModal(false),
        }
      );
    } else {
      addAddress(formData as AddressUserProfile, {
        onSuccess: () => setOpenModal(false),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!addressToDelete) return;
    deleteAddress(addressToDelete, {
      onSuccess: () => setConfirmOpen(false),
    });
  };

  const handleDeleteAddress = (addressId?: number) => {
    if (!addressId) return;
    setAddressToDelete(addressId);
    setConfirmOpen(true);
  };

  const handleCancelDialog = () => {
    setConfirmOpen(false);
    setAddressToDelete(null);
  };

  return (
    <div>
      <SectionHeader
        title="Meus endereços"
        description="Acesse ou altere seus endereços."
      />

      <div className="flex flex-col gap-6">
        {addresses.length > 0 ? (
          addresses.map((address) => (
            <AddressCard
              key={address.id ?? address.alias}
              alias={address.alias}
              road={address.road}
              neighborhood={address.neighborhood}
              city={address.city}
              state={address.state}
              zipCode={address.zipCode}
              number={address.number}
              complement={address.complement}
              phone={address.phoneNumber}
              onEdit={() => handleEditAddress(address)}
              onDelete={() => handleDeleteAddress(address.id)}
            />
          ))
        ) : (
          <p className="text-muted-foreground text-sm">
            Nenhum endereço cadastrado.
          </p>
        )}
      </div>

      <Button
        onClick={handleAddAddress}
        className="w-full lg:w-48 mt-6 flex items-center gap-2 bg-black text-white hover:bg-zinc-800 py-2 h-12 font-light text-xs"
      >
        Adicionar novo endereço
      </Button>
      <Modal
        open={openModal}
        onOpenChange={setOpenModal}
        title={selectedAddress ? "Editar endereço" : "Adicionar endereço"}
        maxWidth="max-w-[720px]"
      >
        <AddressForm
          mode={selectedAddress ? "edit" : "add"}
          defaultValues={selectedAddress}
          onSubmit={handleSubmitAddress}
          onCancel={() => setOpenModal(false)}
          isSubmitting={isAdding || isUpdating}
        />
      </Modal>

      <ConfirmDialog
        open={confirmOpen}
        title="Excluir endereço"
        description="Tem certeza de que deseja excluir este endereço? Esta ação não poderá ser desfeita."
        confirmText={isDeleting ? "Excluindo..." : "Excluir"}
        cancelText="Cancelar"
        loading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDialog}
      />
    </div>
  );
}
