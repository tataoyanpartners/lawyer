"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  TrashIcon,
  CheckIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";

interface Contact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [deleteContact, setDeleteContact] = useState<Contact | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/contacts");
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleMarkAsRead = async (contact: Contact) => {
    try {
      const response = await fetch("/api/contacts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: contact._id, isRead: true }),
      });
      if (response.ok) {
        setContacts(contacts.map(c =>
          c._id === contact._id ? { ...c, isRead: true } : c
        ));
      }
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteContact) return;
    setIsDeleting(true);
    try {
      const response = await fetch("/api/contacts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: deleteContact._id }),
      });
      if (response.ok) {
        setContacts(contacts.filter(c => c._id !== deleteContact._id));
        setDeleteContact(null);
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    if (!contact.isRead) {
      handleMarkAsRead(contact);
    }
  };

  const unreadCount = contacts.filter(c => !c.isRead).length;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-4 w-96 bg-gray-100 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 w-1/2 bg-gray-100 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-100 rounded animate-pulse"></div>
                  <div className="h-3 w-2/3 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-[#486BAD]">
              Կապի հարցումներ
            </h1>
            <p className="text-gray-600">
              Դիտել և կառավարել կայքից կապի հարցումները
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#486BAD] rounded-lg flex items-center justify-center">
                  <InboxIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#486BAD]">
                    Ընդհանուր
                  </p>
                  <p className="text-2xl font-bold text-[#486BAD]">
                    {contacts.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <EnvelopeIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-orange-600">
                    Չկարդացված
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {unreadCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <CheckIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-green-600">
                    Կարդացված
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {contacts.length - unreadCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {contacts.length === 0 ? (
          <Card className="p-12 text-center">
            <InboxIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-[#486BAD] mb-2">
              Կոնտակտային հաղորդագրություններ դեռ չկան
            </h3>
            <p className="text-gray-600">
              Երբ ինչ-որ մեկը լրացնում է ձեր կայքում կոնտակտային ձևաթուղթը, նրա հաղորդագրությունները կհայտնվեն այստեղ։
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {contacts.map((contact) => (
              <Card
                key={contact._id}
                className={`overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer ${!contact.isRead ? "border-l-4 border-l-[#486BAD]" : ""
                  }`}
                onClick={() => handleViewContact(contact)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-[#486BAD]/10 rounded-full flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-[#486BAD]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#486BAD]">
                          {contact.name}
                        </h3>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <CalendarIcon className="w-3 h-3" />
                          {format(new Date(contact.createdAt), "MMM d, yyyy HH:mm")}
                        </span>
                      </div>
                    </div>
                    {!contact.isRead && (
                      <Badge className="bg-[#486BAD] text-white text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pt-2">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PhoneIcon className="w-4 h-4 text-gray-400" />
                      <span>{contact.phone}</span>
                    </div>
                    <p className="line-clamp-2 text-gray-500 mt-2">
                      {contact.message}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#486BAD]">
              <EnvelopeIcon className="w-5 h-5" />
              Հաղորդագրության մանրամասները
            </DialogTitle>
          </DialogHeader>

          {selectedContact && (
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <UserIcon className="w-5 h-5 text-[#486BAD]" />
                  <div>
                    <p className="text-xs text-gray-500">Անուն ազգանուն</p>
                    <p className="font-medium text-[#486BAD]">{selectedContact.name}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <EnvelopeIcon className="w-5 h-5 text-[#486BAD]" />
                  <div>
                    <p className="text-xs text-gray-500">Էլ. հասցե</p>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="font-medium text-[#486BAD] hover:underline"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <PhoneIcon className="w-5 h-5 text-[#486BAD]" />
                  <div>
                    <p className="text-xs text-gray-500">Հեռախոսահամար</p>
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="font-medium text-[#486BAD] hover:underline"
                    >
                      {selectedContact.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-[#486BAD]" />
                  <div>
                    <p className="text-xs text-gray-500">Ամսաթիվ</p>
                    <p className="font-medium text-[#486BAD]">
                      {format(new Date(selectedContact.createdAt), "MMMM d, yyyy 'at' HH:mm")}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-2">Հաղորդագրություն</p>
                  <p className="text-gray-700 whitespace-pre-wrap break-all">{selectedContact.message}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setSelectedContact(null)}
            >
              Փակել
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setDeleteContact(selectedContact);
                setSelectedContact(null);
              }}
            >
              <TrashIcon className="w-4 h-4 mr-2" />
              Հեռացնել
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteContact} onOpenChange={() => setDeleteContact(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <TrashIcon className="w-5 h-5" />
              Հեռացնե՞լ այս նամակը
            </DialogTitle>
            <DialogDescription>
              Այս գործողությունը չի կարող չողարկվել: Կոնտակտային հաղորդագրությունը ընդմիշտ կհեռացվի:
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteContact(null)}
              disabled={isDeleting}
            >
              Չեղարկել
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Հեռացվում է..." : "Հեռացնել"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
