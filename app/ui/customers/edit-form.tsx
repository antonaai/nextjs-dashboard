'use client';

import { ClientForm } from '@/app/lib/definitions';
import { useActionState, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateClient, ClientState } from '@/app/lib/actions';

export default function EditClientForm({
    client,
}: {
    client: ClientForm
}) {
    const updateInvoiceWithId = updateClient.bind(null, client.id);
    const [clientType, setClientType] = useState(client.type || 'individual');
 
    return (
        <form action={updateInvoiceWithId}>
            {/* TODO: Add pattern to inputs for validation */}
            <div className="rounded-md bg-gray-50 p-4 md:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    {/* Client Name  */}
                    <div className="mb-4">
                        <label htmlFor="name" className="mb-2 block text-sm font-medium">
                            Nome
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Inserisci il nome e il cognome del cliente"
                                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="name-error"
                                autoComplete="name"
                                defaultValue={client.name}
                                required
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <label htmlFor="email" className="mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Inserisci l'email del cliente"
                                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="email-error"
                                autoComplete="email"
                                defaultValue={client.email}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    {/* Address */}
                    <div className="mb-4">
                        <label htmlFor="address" className="mb-2 block text-sm font-medium">
                            Via e Numero Civico
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="Inserisci l'indirizzo del cliente"
                                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="address-error"
                                autoComplete="on"
                                defaultValue={client.address}
                                required
                            />
                        </div>
                    </div>
                    {/* Zip Code */}
                    <div className="mb-4">
                        <label htmlFor="zip-code" className="mb-2 block text-sm font-medium">
                            Codice Postale
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="zip-code"
                                name="zip_code"
                                type="text"
                                placeholder="Inserisci il codice postale"
                                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="zipcode-error"
                                autoComplete="on"
                                required
                                defaultValue={client.zip_code}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    {/* City */}
                    <div className="mb-4">
                        <label htmlFor="city" className="mb-2 block text-sm font-medium">
                            Città
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="city"
                                name="city"
                                type="text"
                                placeholder="Inserisci la città"
                                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="city-error"
                                autoComplete="on"
                                required
                                defaultValue={client.city}
                            />
                        </div>
                    </div>
                    {/* Province */}
                    <div className="mb-4">
                        <label htmlFor="province" className="mb-2 block text-sm font-medium">
                            Provincia
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="province"
                                name="province"
                                type="text"
                                placeholder="Inserisci la provincia (es. NA)"
                                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="province-error"
                                autoComplete="on"
                                required
                                defaultValue={client.province}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                    {/* Country */}
                    <div className="mb-4">
                        <label htmlFor="country" className="mb-2 block text-sm font-medium">
                            Paese
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="country"
                                name="country"
                                type="text"
                                placeholder="Inserisci il paese"
                                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="country-error"
                                autoComplete="on"
                                required
                                defaultValue={client.country}
                            />
                        </div>
                    </div>
                    {/* Phone */}
                    <div className="mb-4">
                        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                            Telefono
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <input
                                id="phone"
                                name="phone"
                                type="phone"
                                placeholder="Inserisci il numero di telefono"
                                className="peer block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="phone-error"
                                autoComplete="tel"
                                required
                                defaultValue={client.phone}
                            />
                        </div>
                    </div>
                </div>
                {/* Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="mb-4">
                        <label htmlFor="notes" className="mb-2 block text-sm font-medium">
                            Note
                        </label>
                        <div className="relative mt-2 rounded-md">
                            <textarea 
                                name="notes"
                                id="notes"
                                placeholder="Inserisci delle note aggiuntive"
                                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                aria-describedby="notes-error"
                                rows={4}
                                defaultValue={client.notes}
                            ></textarea>
                        </div>
                    </div>
                </div>
                {/* Type */}
                <fieldset className="mb-4">
                    <legend className="mb-2">Seleziona il tipo di cliente</legend>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input type="radio" id="individualType" name="type" value="individual" aria-describedby="type-error" checked={clientType === 'individual'} onChange={() => { setClientType('individual') }} />
                            <label htmlFor="individualType">Persona</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="radio" id="companyType" name="type" value="company" aria-describedby="type-error" checked={clientType === 'company'} onChange={() => { setClientType('company') }} />
                            <label htmlFor="companyType">Azienda</label>
                        </div>
                    </div>
                </fieldset>
                {/* Fiscal Code */}
                {clientType === 'individual' && (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="mb-4">
                            <label htmlFor="fiscalCode" className="mb-2 block text-sm font-medium">
                                Codice fiscale
                            </label>
                            <div className="relative mt-2 rounded-md">
                                <input
                                    id="fiscalCode"
                                    name="fiscal_code"
                                    type="text"
                                    placeholder="Inserisci il codice fiscale"
                                    className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                    aria-describedby="fiscalCode-error"
                                    autoComplete="on"
                                    defaultValue={client.fiscal_code}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {clientType === 'company' && (
                    <fieldset>
                        <legend className="sr-only">Campi per cliente aziendale</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                            {/* VAT */}
                            <div className="mb-4">
                                <label htmlFor="vatNumber" className="mb-2 block text-sm font-medium">
                                    Parita IVA
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <input
                                        id="vatNumber"
                                        name="vat_number"
                                        type="text"
                                        placeholder="Inserisci la P.IVA del cliente"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        aria-describedby="vatNumber-error"
                                        autoComplete="on"
                                        defaultValue={client.vat_number}
                                    />
                                </div>
                            </div>
                            {/* SDI */}
                            <div className="mb-4">
                                <label htmlFor="sdiCode" className="mb-2 block text-sm font-medium">
                                    Codice SDI
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <input
                                        id="sdiCode"
                                        name="sdi_code"
                                        type="text"
                                        placeholder="Inserisci il codice SDI"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        aria-describedby="sdiCode-error"
                                        autoComplete="on"
                                        defaultValue={client.sdi_code}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                            {/* PEC */}
                            <div className="mb-4">
                                <label htmlFor="pecEmail" className="mb-2 block text-sm font-medium">
                                    Email PEC
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <input
                                        id="pecEmail"
                                        name="pec_email"
                                        type="email"
                                        placeholder="Inserisci la PEC"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        aria-describedby="pecEmail-error"
                                        autoComplete="on"
                                        defaultValue={client.pec_email}
                                    />
                                </div>
                            </div>
                            {/* Contact Person */}
                            <div className="mb-4">
                                <label htmlFor="contactPerson" className="mb-2 block text-sm font-medium">
                                    Referente aziendale
                                </label>
                                <div className="relative mt-2 rounded-md">
                                    <input
                                        id="contactPerson"
                                        name="contact_person"
                                        type="text"
                                        placeholder="Inserisci il nome del referente aziendale"
                                        className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                                        aria-describedby="contactPerson-error"
                                        autoComplete="on"
                                        defaultValue={client.contact_person}
                                    />
                                </div>
                            </div>
                        </div>
                    </fieldset>
                )}
                <div className="mt-6 flex justify-end gap-4">
                    <Link
                        href="/dashboard/customers"
                        className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
                    >
                    Torna indietro
                    </Link>
                    <Button type="submit">Aggiorna Cliente</Button>
                </div>
            </div>
        </form>
    );
}