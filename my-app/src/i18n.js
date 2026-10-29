import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  et: {
    translation: {
      home: "Avaleht",
      about: "Meist",
      welcome: "Tere tulemast minu Reacti rakendusse!",
      apiInfo: "Rakendus kasutab inimeste andmete haldamiseks API-t.",

      courseTitle: "Reacti kursus",
      courseDescription: "Õpi Reactiga veebirakendusi looma.",

      simulation: "Protsessi simulatsioon",
      pressToStart: "Vajuta protsessi alustamiseks nuppu.",
      start: "Alusta",
      loading: "Laadimine... palun oota...",
      successTitle: "Õnnestus!",
      success: "Ühendus õnnestus.",
      error: "Viga! Midagi läks valesti!",
      returning: "Naasen algusesse...",
      restart: "Alusta uuesti",
      back: "Mine tagasi",

      people: "API kaudu saadud inimesed:",
      addPerson: "Lisa inimene",
      editPerson: "Muuda inimest",
      addNewPerson: "Lisa uus inimene",
      save: "Salvesta PUT",
      add: "Lisa POST",
      delete: "Kustuta",
      close: "Sulge",
      name: "Nimi",
      age: "Vanus",
      years: "aastat",
      edit: "Muuda",
      patch: "PATCH nimi",
      language: "Keel",

      enterName: "Sisesta uus nimi:",
      fillFields: "Palun täida mõlemad väljad!",
      enterNewName: "Palun sisesta uus nimi!",
      loadError: "Inimeste laadimine ebaõnnestus.",
      addError: "Inimese lisamine ebaõnnestus.",
      deleteError: "Inimese kustutamine ebaõnnestus.",
      updateError: "Inimese muutmine ebaõnnestus.",
      patchError: "Nime muutmine ebaõnnestus."
    }
  },

  en: {
    translation: {
      home: "Home",
      about: "About us",
      welcome: "Welcome to my React application!",
      apiInfo: "The application uses an API to manage people's data.",

      courseTitle: "React Course",
      courseDescription: "Learn to build web applications with React.",

      simulation: "Process simulation",
      pressToStart: "Press the button to start the process.",
      start: "Start",
      loading: "Loading... please wait...",
      successTitle: "Success!",
      success: "The connection was successful.",
      error: "Error! Something went wrong!",
      returning: "Returning to the beginning...",
      restart: "Start again",
      back: "Go back",

      people: "People retrieved through the API:",
      addPerson: "Add person",
      editPerson: "Edit person",
      addNewPerson: "Add a new person",
      save: "Save PUT",
      add: "Add POST",
      delete: "Delete",
      close: "Close",
      name: "Name",
      age: "Age",
      years: "years old",
      edit: "Edit",
      patch: "PATCH name",
      language: "Language",

      enterName: "Enter the new name:",
      fillFields: "Please fill in both fields!",
      enterNewName: "Please enter a new name!",
      loadError: "Failed to load people.",
      addError: "Failed to add person.",
      deleteError: "Failed to delete person.",
      updateError: "Failed to update person.",
      patchError: "Failed to update name."
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "et",
  fallbackLng: "et",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;