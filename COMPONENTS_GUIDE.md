# react-develop-universe - Guida ai Componenti

## Indice

1. [Introduzione](#introduzione)
2. [Installazione e Setup](#installazione-e-setup)
3. [Architettura](#architettura)
4. [Componenti UI](#componenti-ui)
   - [Button](#button)
   - [Cards](#cards)
   - [Chips](#chips)
5. [Componenti Input](#componenti-input)
   - [Input Text](#input-text)
   - [Input Password](#input-password)
   - [Input Email](#input-email)
   - [Input Number](#input-number)
   - [Input Search](#input-search)
   - [Input Tel](#input-tel)
   - [Input URL](#input-url)
   - [Input Date](#input-date)
   - [Input DateTime Local](#input-datetime-local)
   - [Input Time](#input-time)
   - [Input Month](#input-month)
   - [Input Week](#input-week)
   - [Input Color](#input-color)
   - [Input Range](#input-range)
   - [Input File](#input-file)
   - [Input Hidden](#input-hidden)
   - [Input Checkbox](#input-checkbox)
   - [Input Radio](#input-radio)
   - [Input Datalist](#input-datalist)
   - [Select](#select)
   - [Select Object](#select-object)
   - [Textarea](#textarea)
6. [Dialog e Offcanvas](#dialog-e-offcanvas)
   - [Dialog Provider](#dialog-provider)
   - [Offcanvas Provider](#offcanvas-provider)
7. [Sistema Chat AI](#sistema-chat-ai)
8. [Provider di Sistema](#provider-di-sistema)
   - [Loader Provider](#loader-provider)
   - [Error Provider](#error-provider)
9. [Interceptor](#interceptor)
   - [Loader Interceptor](#loader-interceptor)
   - [Error Interceptor](#error-interceptor)
   - [MSAL Interceptor](#msal-interceptor)
10. [Internazionalizzazione](#internazionalizzazione)
11. [Styling](#styling)

---

## Introduzione

La **react-develop-universe** è una libreria di componenti React progettata per fornire un set completo e coerente di elementi UI riutilizzabili. Tutti i componenti sono prefissati con `RDU_` per facilitarne l'identificazione e prevenire conflitti di naming.

### Caratteristiche principali

- **React 19+** e **TypeScript** per type-safety
- **React Hook Form** per la gestione dei form
- **Zod** per la validazione degli schemi
- **Redux Toolkit** per la gestione dello stato
- **Internazionalizzazione** integrata
- **Accessibilità ARIA** su tutti i componenti
- **Design system coerente** con varianti di colore

---

## Installazione e Setup

### Installazione

```bash
npm install react-develop-universe
```

### Peer Dependencies

Assicurati di avere installate le seguenti dipendenze:

```bash
npm install react@^19.1.0 react-dom@^19.1.0 @reduxjs/toolkit@^2.6.1 react-redux@^9.2.0
```

### Configurazione Redux Store

Per utilizzare i componenti che richiedono Redux (Chat, Loader, Error), configura lo store:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import { RduChatSlice } from 'react-develop-universe';
import { RduLoaderSlice } from 'react-develop-universe';
import { RduErrorSlice } from 'react-develop-universe';

export const store = configureStore({
  reducer: {
    loaderState: RduLoaderSlice.reducer,
    chatState: RduChatSlice.reducer,
    errorState: RduErrorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Setup Provider

Avvolgi la tua applicazione con i provider necessari:

```typescript
import { Provider } from 'react-redux';
import { OffcanvasProvider, ErrorProvider, LoaderProvider } from 'react-develop-universe';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <LoaderProvider loaderComponent={<YourLoaderComponent />}>
        <ErrorProvider closeIcon={<YourCloseIcon />}>
          <OffcanvasProvider closeIcon={<YourCloseIcon />}>
            {/* Your app */}
          </OffcanvasProvider>
        </ErrorProvider>
      </LoaderProvider>
    </Provider>
  );
}
```

---

## Architettura

### Convenzioni di Naming

- **Componenti**: Prefisso `RDU_` (es. `RDU_Button`)
- **Props**: Interfacce con suffisso `Props` (es. `RduButtonProps`)
- **Classi CSS**: Prefisso `rdu-` (es. `rdu-button`)
- **Slice Redux**: Prefisso `Rdu` (es. `RduChatSlice`)

### Sistema di Traduzione

I componenti utilizzano una funzione globale `window.t` per la traduzione. Le chiavi seguono il pattern:

- **Label**: `${feature}.${name}.label`
- **Placeholder**: `${feature}.${name}.placeHolder`
- **Help**: `${feature}.${name}.help`
- **Success**: `${feature}.${name}.success`
- **Error**: `${feature}.${name}.${errorType}`

---

## Componenti UI

### Button

Il componente `RDU_Button` fornisce un pulsante accessibile con supporto per icone e varianti.

#### Props

```typescript
interface RduButtonProps {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  id?: string;
  text?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right' | 'only';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'error' | 'success' | 'info' | 'light' | 'dark';
  alt?: string;
  ariaLabel?: string;
}
```

#### Esempio di utilizzo

```typescript
import { RDU_Button } from 'react-develop-universe';
import { FaRocket } from 'react-icons/fa';

function MyComponent() {
  return (
    <>
      {/* Button primario con testo */}
      <RDU_Button 
        type="button" 
        text="Click me" 
        variant="primary"
        onClick={() => console.log('Clicked')}
      />

      {/* Button con icona a sinistra */}
      <RDU_Button 
        type="submit" 
        text="Submit" 
        variant="success"
        icon={<FaRocket />}
        iconPosition="left"
      />

      {/* Button solo icona */}
      <RDU_Button 
        type="button" 
        variant="tertiary"
        icon={<FaRocket />}
        iconPosition="only"
        ariaLabel="Launch"
      />
    </>
  );
}
```

#### Varianti disponibili

- `primary` - Azione principale
- `secondary` - Azione secondaria
- `tertiary` - Azione terziaria
- `warning` - Avvisi
- `error` - Azioni distruttive
- `success` - Conferme
- `info` - Informazioni
- `light` - Variante chiara
- `dark` - Variante scura

---

### Cards

Il sistema di card è composto da quattro componenti modulari che possono essere combinati.

#### Componenti disponibili

- `RDU_Card` - Container principale
- `RDU_CardHeader` - Intestazione
- `RDU_CardBody` - Contenuto principale
- `RDU_CardFooter` - Footer con azioni

#### Esempio di utilizzo

```typescript
import { 
  RDU_Card, 
  RDU_CardHeader, 
  RDU_CardBody, 
  RDU_CardFooter, 
  RDU_Button 
} from 'react-develop-universe';

function MyCard() {
  return (
    <RDU_Card>
      <RDU_CardHeader>
        <h3>Titolo della Card</h3>
      </RDU_CardHeader>
      
      <RDU_CardBody>
        <p>Contenuto della card con testo e altri elementi.</p>
      </RDU_CardBody>
      
      <RDU_CardFooter>
        <RDU_Button type="button" variant="primary" text="Conferma" />
        <RDU_Button type="button" variant="secondary" text="Annulla" />
      </RDU_CardFooter>
    </RDU_Card>
  );
}
```

---

### Chips

Componente per visualizzare tag o etichette con azione opzionale.

#### Props

```typescript
interface RduChipProps {
  withAction?: boolean;
  actionIcon?: ReactNode;
  whenActionClick?: () => void;
  textAction?: string;
  text: string;
}
```

#### Esempio di utilizzo

```typescript
import { RDU_Chips } from 'react-develop-universe';
import { FaTimes } from 'react-icons/fa';

function MyChips() {
  return (
    <RDU_Chips
      text="React"
      withAction={true}
      actionIcon={<FaTimes />}
      textAction="remove"
      whenActionClick={() => console.log('Chip removed')}
    />
  );
}
```

---

## Componenti Input

Tutti i componenti input condividono una struttura comune e integrano la validazione con React Hook Form e Zod.

### Caratteristiche comuni

- **Validazione**: Integrazione con React Hook Form e Zod
- **Messaggi di feedback**: Success, Error, Help
- **Accessibilità**: Label, ARIA attributes
- **Internazionalizzazione**: Tramite `window.t`
- **Required indicator**: Asterisco automatico per campi obbligatori

### Props comuni

```typescript
interface CommonInputProps {
  name: string;              // Nome del campo
  feature: string;           // Namespace per traduzione
  id: string;                // ID HTML
  disabled?: boolean;        // Stato disabilitato
  autoFocus?: boolean;       // Focus automatico
  autoComplete?: string;     // Attributo autocomplete
  register: UseFormRegister<any>;      // React Hook Form register
  formState: FormState<any>;           // React Hook Form state
  schema: any;               // Schema Zod per validazione
  successMsg?: boolean;      // Mostra messaggio di successo
  errorMsg?: boolean;        // Mostra messaggio di errore
  helpMsg?: boolean;         // Mostra messaggio di aiuto
  onInput?: () => void;      // Callback input
}
```

### Setup per l'utilizzo degli input

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Definisci lo schema Zod
const FormSchema = z.object({
  username: z.string().nonempty({ message: 'required' }).max(50, { message: 'maxLength' }),
  email: z.string().email({ message: 'invalidEmail' }),
  age: z.number().min(18, { message: 'minAge' }),
});

type FormData = z.infer<typeof FormSchema>;

function MyForm() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Input components here */}
    </form>
  );
}
```

---

### Input Text

Input di testo standard con validazione.

#### Props specifiche

```typescript
interface RduInputTextProps extends CommonInputProps {
  maxLength: number;
}
```

#### Esempio di utilizzo

```typescript
import { RDU_InputText, RDU_Button } from 'react-develop-universe';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

function TextInputExample() {
  const TextSchema = z.object({
    username: z.string().nonempty({ message: 'required' }).max(50, { message: 'maxLength' }),
  });

  type TextFormData = z.infer<typeof TextSchema>;

  const { register, handleSubmit, formState } = useForm<TextFormData>({
    resolver: zodResolver(TextSchema),
    mode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <RDU_InputText
        name="username"
        feature="myFeature"
        id="username-input"
        maxLength={50}
        autoComplete="none"
        disabled={false}
        register={register}
        formState={formState}
        schema={TextSchema}
        errorMsg={true}
        successMsg={true}
        helpMsg={true}
      />
      <RDU_Button type="submit" text="Submit" variant="primary" />
    </form>
  );
}
```

---

### Input Password

Input per password con caratteri mascherati.

#### Esempio di utilizzo

```typescript
import { RDU_InputPassword } from 'react-develop-universe';

<RDU_InputPassword
  name="password"
  feature="auth"
  id="password-input"
  maxLength={100}
  autoComplete="current-password"
  register={register}
  formState={formState}
  schema={PasswordSchema}
  errorMsg={true}
/>
```

---

### Input Email

Input specializzato per indirizzi email con validazione nativa del browser.

#### Esempio di utilizzo

```typescript
import { RDU_InputEmail } from 'react-develop-universe';

const EmailSchema = z.object({
  email: z.string().email({ message: 'invalidEmail' }),
});

<RDU_InputEmail
  name="email"
  feature="contact"
  id="email-input"
  maxLength={100}
  autoComplete="email"
  register={register}
  formState={formState}
  schema={EmailSchema}
  errorMsg={true}
  successMsg={true}
/>
```

---

### Input Number

Input per valori numerici.

#### Esempio di utilizzo

```typescript
import { RDU_InputNumber } from 'react-develop-universe';

const NumberSchema = z.object({
  age: z.number().min(0, { message: 'minValue' }).max(120, { message: 'maxValue' }),
});

<RDU_InputNumber
  name="age"
  feature="profile"
  id="age-input"
  max={120}
  min={0}
  register={register}
  formState={formState}
  schema={NumberSchema}
  errorMsg={true}
/>
```

---

### Input Search

Input ottimizzato per la ricerca.

#### Esempio di utilizzo

```typescript
import { RDU_InputSearch } from 'react-develop-universe';

<RDU_InputSearch
  name="search"
  feature="search"
  id="search-input"
  maxLength={100}
  autoComplete="off"
  register={register}
  formState={formState}
  schema={SearchSchema}
/>
```

---

### Input Tel

Input per numeri di telefono.

#### Esempio di utilizzo

```typescript
import { RDU_InputTel } from 'react-develop-universe';

<RDU_InputTel
  name="phone"
  feature="contact"
  id="phone-input"
  maxLength={20}
  autoComplete="tel"
  register={register}
  formState={formState}
  schema={PhoneSchema}
  errorMsg={true}
/>
```

---

### Input URL

Input per indirizzi URL con validazione nativa.

#### Esempio di utilizzo

```typescript
import { RDU_InputUrl } from 'react-develop-universe';

<RDU_InputUrl
  name="website"
  feature="profile"
  id="website-input"
  maxLength={200}
  autoComplete="url"
  register={register}
  formState={formState}
  schema={UrlSchema}
  errorMsg={true}
/>
```

---

### Input Date

Input per la selezione di date.

#### Esempio di utilizzo

```typescript
import { RDU_InputDate } from 'react-develop-universe';

const DateSchema = z.object({
  birthDate: z.string().nonempty({ message: 'required' }),
});

<RDU_InputDate
  name="birthDate"
  feature="profile"
  id="birth-date-input"
  autoComplete="bday"
  register={register}
  formState={formState}
  schema={DateSchema}
  errorMsg={true}
/>
```

---

### Input DateTime Local

Input per data e ora.

#### Esempio di utilizzo

```typescript
import { RDU_InputDatetimeLocal } from 'react-develop-universe';

<RDU_InputDatetimeLocal
  name="appointmentTime"
  feature="booking"
  id="appointment-input"
  autoComplete="none"
  register={register}
  formState={formState}
  schema={AppointmentSchema}
  errorMsg={true}
/>
```

---

### Input Time

Input per la selezione dell'ora.

#### Esempio di utilizzo

```typescript
import { RDU_InputTime } from 'react-develop-universe';

<RDU_InputTime
  name="meetingTime"
  feature="calendar"
  id="time-input"
  autoComplete="none"
  register={register}
  formState={formState}
  schema={TimeSchema}
/>
```

---

### Input Month

Input per la selezione di mese e anno.

#### Esempio di utilizzo

```typescript
import { RDU_InputMonth } from 'react-develop-universe';

<RDU_InputMonth
  name="expiryMonth"
  feature="payment"
  id="month-input"
  autoComplete="none"
  register={register}
  formState={formState}
  schema={MonthSchema}
/>
```

---

### Input Week

Input per la selezione della settimana.

#### Esempio di utilizzo

```typescript
import { RDU_InputWeek } from 'react-develop-universe';

<RDU_InputWeek
  name="targetWeek"
  feature="planning"
  id="week-input"
  autoComplete="none"
  register={register}
  formState={formState}
  schema={WeekSchema}
/>
```

---

### Input Color

Input per la selezione di colori.

#### Esempio di utilizzo

```typescript
import { RDU_InputColor } from 'react-develop-universe';

<RDU_InputColor
  name="favoriteColor"
  feature="preferences"
  id="color-input"
  autoComplete="none"
  register={register}
  formState={formState}
  schema={ColorSchema}
/>
```

---

### Input Range

Input slider per valori numerici in un range.

#### Esempio di utilizzo

```typescript
import { RDU_InputRange } from 'react-develop-universe';

<RDU_InputRange
  name="volume"
  feature="settings"
  id="volume-input"
  min={0}
  max={100}
  autoComplete="none"
  register={register}
  formState={formState}
  schema={RangeSchema}
/>
```

---

### Input File

Input per l'upload di file.

#### Props specifiche

```typescript
interface RduInputFileProps extends CommonInputProps {
  accept?: string;
  multiple?: boolean;
}
```

#### Esempio di utilizzo

```typescript
import { RDU_InputFile } from 'react-develop-universe';

<RDU_InputFile
  name="attachment"
  feature="upload"
  id="file-input"
  accept=".pdf,.doc,.docx"
  multiple={false}
  register={register}
  formState={formState}
  schema={FileSchema}
  errorMsg={true}
/>
```

---

### Input Hidden

Input nascosto per valori non visibili all'utente.

#### Esempio di utilizzo

```typescript
import { RDU_InputHidden } from 'react-develop-universe';

<RDU_InputHidden
  name="userId"
  feature="form"
  id="user-id-input"
  register={register}
  formState={formState}
  schema={FormSchema}
/>
```

---

### Input Checkbox

Checkbox con label personalizzabile.

#### Props specifiche

```typescript
interface RduInputCheckboxProps extends CommonInputProps {
  label: string;
  labelIsVisible?: boolean;
}
```

#### Esempio di utilizzo

```typescript
import { RDU_InputCheckbox } from 'react-develop-universe';

const CheckboxSchema = z.object({
  acceptTerms: z.boolean().refine(val => val === true, { message: 'required' }),
});

<RDU_InputCheckbox
  name="acceptTerms"
  feature="registration"
  id="terms-checkbox"
  label="Accept terms and conditions"
  disabled={false}
  register={register}
  formState={formState}
  schema={CheckboxSchema}
  errorMsg={true}
  labelIsVisible={true}
/>
```

---

### Input Radio

Radio button per selezioni multiple esclusive.

#### Props specifiche

```typescript
interface RduInputRadioProps extends CommonInputProps {
  value?: string;
  labelIsVisible?: boolean;
}
```

#### Esempio di utilizzo

```typescript
import { RDU_InputRadio } from 'react-develop-universe';

const RadioSchema = z.object({
  gender: z.string().nonempty({ message: 'required' }),
});

<>
  <RDU_InputRadio
    name="gender"
    feature="profile"
    id="gender-male"
    value="male"
    disabled={false}
    register={register}
    formState={formState}
    schema={RadioSchema}
    labelIsVisible={true}
  />
  <RDU_InputRadio
    name="gender"
    feature="profile"
    id="gender-female"
    value="female"
    disabled={false}
    register={register}
    formState={formState}
    schema={RadioSchema}
    labelIsVisible={true}
  />
</>
```

---

### Input Datalist

Input con autocompletamento da una lista predefinita.

#### Props specifiche

```typescript
interface RduInputDatalistProps extends CommonInputProps {
  options: string[];
}
```

#### Esempio di utilizzo

```typescript
import { RDU_InputDatalist } from 'react-develop-universe';

const countries = ['Italy', 'France', 'Germany', 'Spain', 'Portugal'];

<RDU_InputDatalist
  name="country"
  feature="address"
  id="country-input"
  maxLength={50}
  options={countries}
  autoComplete="country"
  register={register}
  formState={formState}
  schema={CountrySchema}
  errorMsg={true}
/>
```

---

### Select

Select standard per la selezione da una lista di stringhe.

#### Props specifiche

```typescript
interface RduSelectProps extends CommonInputProps {
  options: string[];
}
```

#### Esempio di utilizzo

```typescript
import { RDU_Select } from 'react-develop-universe';

const SelectSchema = z.object({
  role: z.string().nonempty({ message: 'required' }),
});

const roles = ['Admin', 'User', 'Guest'];

<RDU_Select
  name="role"
  feature="settings"
  id="role-select"
  options={roles}
  autoComplete="none"
  disabled={false}
  register={register}
  formState={formState}
  schema={SelectSchema}
  errorMsg={true}
  successMsg={true}
/>
```

---

### Select Object

Select per la selezione da un array di oggetti.

#### Props specifiche

```typescript
interface RduSelectObjectProps extends CommonInputProps {
  options: Array<any>;
  valueKey: string;      // Chiave per il valore
  optionKey: string;     // Chiave per il testo visualizzato
}
```

#### Esempio di utilizzo

```typescript
import { RDU_SelectObject } from 'react-develop-universe';

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Smith' },
  { id: 3, name: 'Bob Johnson' },
];

<RDU_SelectObject
  name="assignee"
  feature="task"
  id="assignee-select"
  options={users}
  valueKey="id"
  optionKey="name"
  autoComplete="none"
  register={register}
  formState={formState}
  schema={AssigneeSchema}
  errorMsg={true}
/>
```

---

### Textarea

Area di testo multilinea.

#### Props specifiche

```typescript
interface RduTextareaProps extends CommonInputProps {
  maxLength?: number;
  cols?: number;
  rows?: number;
}
```

#### Esempio di utilizzo

```typescript
import { RDU_Textarea } from 'react-develop-universe';

const TextareaSchema = z.object({
  description: z.string().nonempty({ message: 'required' }).max(500, { message: 'maxLength' }),
});

<RDU_Textarea
  name="description"
  feature="product"
  id="description-textarea"
  maxLength={500}
  cols={50}
  rows={5}
  autoComplete="none"
  register={register}
  formState={formState}
  schema={TextareaSchema}
  errorMsg={true}
  helpMsg={true}
/>
```

---

## Dialog e Offcanvas

### Dialog Provider

Sistema per la gestione di dialog modali nell'applicazione.

#### Setup

```typescript
import { DialogProvider } from 'react-develop-universe';
import { FaTimes } from 'react-icons/fa';

function App() {
  return (
    <DialogProvider closeIcon={<FaTimes />}>
      {/* Your app */}
    </DialogProvider>
  );
}
```

#### Hook useDialog

```typescript
import { useDialog } from 'react-develop-universe';

function MyComponent() {
  const { openDialog, closeDialog } = useDialog();

  const handleOpenDialog = () => {
    openDialog(
      <div>
        <p>Contenuto del dialog</p>
        <button onClick={closeDialog}>Chiudi</button>
      </div>,
      'Titolo del Dialog',  // opzionale
      'dialog-id'           // opzionale
    );
  };

  return (
    <button onClick={handleOpenDialog}>
      Apri Dialog
    </button>
  );
}
```

#### API

```typescript
interface DialogContext {
  openDialog: (
    node: ReactNode,      // Contenuto del dialog
    title?: string,       // Titolo opzionale
    id?: string          // ID opzionale
  ) => void;
  closeDialog: () => void;
}
```

---

### Offcanvas Provider

Sistema per pannelli laterali scorrevoli.

#### Setup

```typescript
import { OffcanvasProvider } from 'react-develop-universe';
import { FaTimes } from 'react-icons/fa';

function App() {
  return (
    <OffcanvasProvider closeIcon={<FaTimes />}>
      {/* Your app */}
    </OffcanvasProvider>
  );
}
```

#### Hook useOffcanvas

```typescript
import { useOffcanvas } from 'react-develop-universe';

function MyComponent() {
  const { openOffcanvas, closeOffcanvas } = useOffcanvas();

  const handleOpenOffcanvas = () => {
    openOffcanvas(
      <div>
        <p>Contenuto dell'offcanvas</p>
        <button onClick={closeOffcanvas}>Chiudi</button>
      </div>,
      'left',              // 'left' o 'right'
      'Titolo',            // opzionale
      'offcanvas-id'       // opzionale
    );
  };

  return (
    <button onClick={handleOpenOffcanvas}>
      Apri Offcanvas
    </button>
  );
}
```

#### API

```typescript
interface OffcanvasContext {
  openOffcanvas: (
    node: ReactNode,          // Contenuto
    position: 'left' | 'right',  // Posizione
    title?: string,           // Titolo opzionale
    id?: string              // ID opzionale
  ) => void;
  closeOffcanvas: () => void;
}
```

---

## Sistema Chat AI

Sistema completo per l'implementazione di chat AI con supporto per knowledge base, feedback e streaming.

### Componenti principali

- `RDU_ChatAI` - Container principale della chat
- `RDU_ChatEmpty` - Stato vuoto
- `RDU_ChatForm` - Form per l'invio di messaggi
- `RDU_ChatKnowledgeBase` - Selezione knowledge base
- `RDU_ChatMessageAI` - Messaggio AI
- `RDU_ChatLikeFeedback` - Feedback positivo
- `RDU_ChatDislikeFeedback` - Feedback negativo

### Setup Redux

```typescript
import { RduChatSlice } from 'react-develop-universe';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    chatState: RduChatSlice.reducer,
  },
});
```

### Utilizzo base

```typescript
import { RDU_ChatAI } from 'react-develop-universe';
import { 
  FaPaperPlane, 
  FaThumbsUp, 
  FaThumbsDown, 
  FaTimes,
  FaSpinner 
} from 'react-icons/fa';

function ChatComponent() {
  return (
    <RDU_ChatAI
      title="chat.title"
      sendIcon={<FaPaperPlane />}
      likeIcon={<FaThumbsUp />}
      dislikeIcon={<FaThumbsDown />}
      actionIcon={<FaTimes />}
      closeIcon={<FaTimes />}
      loaderIcon={<FaSpinner />}
    />
  );
}
```

### Chat State Management

#### Actions disponibili

```typescript
// Knowledge Base
initKnowledgeBase()
storeKnowledgeBase({ knowledgeBase })
clearKnowledgeBase()
addSelectedKnowledgeBase({ chatId, knowledgeBase })
removeSelectedKnowledgeBase({ chatId, knowledgeBase })
addTemporaryKb({ knowledgeBase })
removeTemporaryKb({ knowledgeBase })
clearTemporaryKb()

// Chat
storeChat({ chatId })
clearChat()
storeIsReceiving()
clearIsReceiving()

// Messages
storeMessages({ chatId, messages })
addMessages({ chatId, messages })
removeMessages({ chatId, streamingId })
updateMessages({ chatId, streamingId, content })
clearMessages({ chatId })
storeMessage({ chatId, messageToSend })
clearMessage({ chatId })
storeTemporaryMessage({ messageToSend })
clearTemporaryMessage()

// Feedback
storeLike({ chatId, id })
clearLike({ chatId })
storeLikeMessage({ chatId, message })
clearLikeMessage({ chatId })
storeDislike({ chatId, id })
clearDislike({ chatId })
storeDislikeMessage({ chatId, message })
clearDislikeMessage({ chatId })

// Actions
storeAction({ chatId, id })
clearAction({ chatId })
```

#### Selectors

```typescript
import {
  selectChatId,
  selectIsReceiving,
  selectKnowledgeBase,
  selectMessage,
  selectMessages,
  selectMessageLike,
  selectMessageLikeId,
  selectMessageDislike,
  selectMessageDislikeId,
  selectSelectedKnowledgeBase,
  selectTemporaryKnowledgeBase,
  selectTemporaryMessage,
} from 'react-develop-universe';

function MyComponent() {
  const chatId = useSelector(selectChatId);
  const messages = useSelector(selectMessages(chatId));
  const isReceiving = useSelector(selectIsReceiving);
  // ...
}
```

### Modelli dati

```typescript


// KnowledgeBaseDto
interface KnowledgeBaseDto {
  id: string;
  displayName: string;
}
```

### Esempio completo con gestione messaggi

```typescript
import { useDispatch, useSelector } from 'react-redux';
import {
  RDU_ChatAI,
  storeMessage,
  addMessages,
  selectMessages,
  selectChatId,
} from 'react-develop-universe';

function ChatContainer() {
  const dispatch = useDispatch();
  const chatId = useSelector(selectChatId);
  const messages = useSelector(selectMessages(chatId));

  // Logica per l'invio messaggi al backend
  useEffect(() => {
    if (messageToSend) {
      // Invia al backend
      sendToAI(messageToSend).then(response => {
        dispatch(addMessages({
          chatId,
          messages: {
            content: response.content,
            role: 'assistant',
            timestamp: new Date(),
          },
        }));
      });
    }
  }, [messageToSend]);

  return <RDU_ChatAI {...props} />;
}
```

---

## Provider di Sistema

### Loader Provider

Gestisce automaticamente lo stato di loading dell'applicazione.

#### Setup

```typescript
import { LoaderProvider } from 'react-develop-universe';
import { FaSpinner } from 'react-icons/fa';

function App() {
  return (
    <LoaderProvider 
      loaderComponent={
        <div className="loader">
          <FaSpinner className="spinner" />
        </div>
      }
    >
      {/* Your app */}
    </LoaderProvider>
  );
}
```

#### Controllo manuale

```typescript
import { useDispatch } from 'react-redux';
import { showLoader, hideLoader } from 'react-develop-universe';

function MyComponent() {
  const dispatch = useDispatch();

  const handleLongOperation = async () => {
    dispatch(showLoader());
    try {
      await longOperation();
    } finally {
      dispatch(hideLoader());
    }
  };

  return <button onClick={handleLongOperation}>Start</button>;
}
```

#### Selectors

```typescript
import { selectIsLoaderVisible, selectLoaders } from 'react-develop-universe';

const isLoading = useSelector(selectIsLoaderVisible);
const loaderCount = useSelector(selectLoaders);
```

---

### Error Provider

Gestisce la visualizzazione centralizzata degli errori.

#### Setup

```typescript
import { ErrorProvider } from 'react-develop-universe';
import { FaTimes } from 'react-icons/fa';

function App() {
  return (
    <ErrorProvider closeIcon={<FaTimes />}>
      {/* Your app */}
    </ErrorProvider>
  );
}
```

#### Mostrare errori

```typescript
import { useDispatch } from 'react-redux';
import { showError, hideError } from 'react-develop-universe';

function MyComponent() {
  const dispatch = useDispatch();

  const handleError = () => {
    dispatch(showError({
      status: 404,
      message: 'Resource not found',
    }));
  };

  return <button onClick={handleError}>Trigger Error</button>;
}
```

#### Chiudere errori

```typescript
const dispatch = useDispatch();
dispatch(hideError());
```

#### Selectors

```typescript
import { selectError, selectIsErrorVisible } from 'react-develop-universe';

const error = useSelector(selectError);
const isErrorVisible = useSelector(selectIsErrorVisible);
```

---

## Interceptor

Gli interceptor permettono di aggiungere funzionalità automatiche alle richieste HTTP tramite Axios.

### Loader Interceptor

Mostra automaticamente il loader durante le richieste HTTP.

#### Setup

```typescript
import axios from 'axios';
import { setupLoaderInterceptor } from 'react-develop-universe';
import store from './store';

setupLoaderInterceptor(axios, store);
```

**Comportamento:**
- Mostra il loader all'inizio di ogni richiesta
- Nasconde il loader al completamento (successo o errore)
- Gestisce il conteggio per richieste multiple simultanee

---

### Error Interceptor

Gestisce automaticamente gli errori HTTP.

#### Setup

```typescript
import axios from 'axios';
import { setupErrorInterceptor } from 'react-develop-universe';
import store from './store';

setupErrorInterceptor(axios, store);
```

**Comportamento:**
- Intercetta errori delle response HTTP
- Dispatch automatico di `showError` con status e messaggio
- Integrazione con `ErrorProvider` per la visualizzazione

---

### MSAL Interceptor

Aggiunge automaticamente token di autenticazione Microsoft Azure AD alle richieste.

#### Setup

```typescript
import axios from 'axios';
import { PublicClientApplication } from '@azure/msal-browser';
import { setupMsalInterceptor } from 'react-develop-universe';

const msalConfig = {
  auth: {
    clientId: 'your-client-id',
    authority: 'https://login.microsoftonline.com/your-tenant-id',
    redirectUri: 'http://localhost:3000',
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

setupMsalInterceptor(
  axios,
  msalInstance,
  'your-client-id',
  'api.yourdomain.com'  // URL pattern per applicare l'interceptor
);
```

**Comportamento:**
- Acquisisce token silenziosamente
- Aggiunge header `Authorization: Bearer {token}`
- Gestisce refresh token automatico
- Redirect per login se necessario
- Si applica solo alle URL specificate

#### Parametri

```typescript
setupMsalInterceptor(
  axios: AxiosStatic,
  msalInstance: PublicClientApplication,
  clientId: string,
  runWhenUrl: string  // Pattern URL da intercettare
)
```

---

## Internazionalizzazione

### Sistema di traduzione

I componenti utilizzano `window.t` per le traduzioni. Devi implementare questa funzione nella tua applicazione.

#### Implementazione esempio

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import it from './locales/it.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      it: { translation: it },
    },
    lng: 'it',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

// Esponi window.t
window.t = (key: string) => i18n.t(key);

export default i18n;
```

### Struttura delle chiavi di traduzione

#### Per input e form

```json
{
  "myFeature": {
    "username": {
      "label": "Nome utente",
      "placeHolder": "Inserisci il nome utente",
      "help": "Il nome utente deve essere univoco",
      "success": "Nome utente valido",
      "required": "Il campo è obbligatorio",
      "maxLength": "Massimo 50 caratteri"
    }
  }
}
```

#### Per button e componenti UI

```json
{
  "rdu": {
    "button": {
      "submit": "Invia",
      "cancel": "Annulla",
      "close": "Chiudi",
      "save": "Salva"
    }
  }
}
```

#### Per errori

```json
{
  "error": {
    "404": {
      "title": "Pagina non trovata",
      "message": "La risorsa richiesta non è disponibile"
    },
    "500": {
      "title": "Errore del server",
      "message": "Si è verificato un errore interno"
    }
  }
}
```

#### Per chat

```json
{
  "chat": {
    "title": "Assistente AI",
    "empty": {
      "title": "Nessun messaggio",
      "description": "Inizia una conversazione"
    },
    "knowledgeBase": {
      "title": "Base di conoscenza",
      "select": "Seleziona una base di conoscenza"
    }
  }
}
```

---

## Styling

### Sistema di classi CSS

Tutti i componenti utilizzano classi CSS con prefisso `rdu-` per evitare conflitti.

#### Struttura delle classi

```scss
// Button
.rdu-button { }
.rdu-button-text { }
.rdu-button-icon { }
.rdu-primary { }
.rdu-secondary { }
// ...altre varianti

// Input
.rdu-input-text { }
.rdu-is-valid { }
.rdu-is-invalid { }
.rdu-show-help { }
.rdu-help-feedback { }
.rdu-valid-feedback { }
.rdu-invalid-feedback { }

// Dialog
.rdu-dialog { }
.rdu-dialog-header { }
.rdu-dialog-body { }
.rdu-dialog-footer { }
.rdu-dialog-button-close { }

// Offcanvas
.rdu-offcanvas { }
.rdu-offcanvas-header { }
.rdu-offcanvas-content { }
.rdu-offcanvas-button-close { }
.rdu-left { }
.rdu-right { }

// Card
.rdu-card { }
.rdu-card-header { }
.rdu-card-body { }
.rdu-card-footer { }

// Chips
.rdu-chips { }
.rdu-chips-action { }

// Chat
.rdu-chat-ai { }
.rdu-chat-ai-header { }
.rdu-chat-ai-body { }
.rdu-chat-ai-footer { }
.rdu-chat-message { }
.rdu-chat-form { }
```

### Personalizzazione

Per personalizzare gli stili, puoi sovrascrivere le classi CSS nel tuo progetto:

```scss
// custom-styles.scss

// Override button primary
.rdu-button.rdu-primary {
  background-color: #your-color;
  color: #your-text-color;
  
  &:hover {
    background-color: #your-hover-color;
  }
}

// Override input validation
.rdu-input-text .rdu-is-invalid {
  border-color: #your-error-color;
}

.rdu-invalid-feedback {
  color: #your-error-color;
  font-size: 0.875rem;
}
```

### Design Tokens

La libreria include un file `tokens.css` con variabili CSS personalizzabili:

```css
:root {
  /* Colori primari */
  --rdu-primary-color: #your-color;
  --rdu-secondary-color: #your-color;
  
  /* Spaziature */
  --rdu-spacing-xs: 0.25rem;
  --rdu-spacing-sm: 0.5rem;
  --rdu-spacing-md: 1rem;
  --rdu-spacing-lg: 1.5rem;
  --rdu-spacing-xl: 2rem;
  
  /* Typography */
  --rdu-font-family: 'Archivo', sans-serif;
  --rdu-font-size-sm: 0.875rem;
  --rdu-font-size-base: 1rem;
  --rdu-font-size-lg: 1.125rem;
  
  /* Border radius */
  --rdu-border-radius-sm: 0.25rem;
  --rdu-border-radius-md: 0.5rem;
  --rdu-border-radius-lg: 1rem;
}
```

---

## Best Practices

### Validazione Form

1. **Usa sempre Zod** per la validazione degli schemi
2. **Definisci messaggi di errore chiari** nello schema
3. **Configura mode: 'onChange'** per validazione real-time
4. **Usa successMsg, errorMsg, helpMsg** appropriatamente

```typescript
const schema = z.object({
  email: z
    .string()
    .nonempty({ message: 'required' })
    .email({ message: 'invalidEmail' }),
  password: z
    .string()
    .nonempty({ message: 'required' })
    .min(8, { message: 'minLength' }),
});
```

### Gestione Stato

1. **Configura Redux correttamente** con tutti gli slice necessari
2. **Usa i selectors forniti** invece di accedere direttamente allo stato
3. **Dispatch actions con payload corretti** seguendo la tipizzazione

### Accessibilità

1. **Fornisci sempre ariaLabel** per button con solo icone
2. **Usa labelIsVisible** appropriatamente per checkbox e radio
3. **Testa la navigazione da tastiera**
4. **Verifica il contrasto dei colori**

### Internazionalizzazione

1. **Implementa window.t** prima di usare i componenti
2. **Segui la convenzione delle chiavi** (feature.name.type)
3. **Fornisci fallback** per chiavi mancanti
4. **Testa con diverse lingue**

### Performance

1. **Usa React.memo** per componenti che renderizzano spesso
2. **Evita re-render non necessari** con useCallback e useMemo
3. **Lazy load** componenti pesanti come Chat
4. **Ottimizza le immagini** e gli asset

---

## Troubleshooting

### Errori comuni

#### "Cannot find module 'react-develop-universe'"

Assicurati di aver installato la libreria:
```bash
npm install react-develop-universe
```

#### "window.t is not a function"

Implementa la funzione di traduzione:
```typescript
window.t = (key: string) => key; // Implementazione minima
```

#### "Cannot read property 'shape' of undefined"

Passa lo schema Zod correttamente all'input:
```typescript
<RDU_InputText schema={YourSchema} {...otherProps} />
```

#### "useSelector/useDispatch hook error"

Avvolgi l'app con il Redux Provider:
```typescript
<Provider store={store}>
  <App />
</Provider>
```

#### "Dialog/Offcanvas non si apre"

Avvolgi l'app con il provider corrispondente:
```typescript
<DialogProvider closeIcon={<Icon />}>
  <OffcanvasProvider closeIcon={<Icon />}>
    <App />
  </OffcanvasProvider>
</DialogProvider>
```

### Debug

Per debug avanzato, puoi accedere allo stato Redux:

```typescript
import { store } from './store';

// In console
console.log(store.getState());
```

---

## Esempi completi

### Form completo con validazione

```typescript
import {
  RDU_InputText,
  RDU_InputEmail,
  RDU_InputPassword,
  RDU_Select,
  RDU_InputCheckbox,
  RDU_Button,
} from 'react-develop-universe';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const RegistrationSchema = z.object({
  username: z.string().nonempty({ message: 'required' }).max(50, { message: 'maxLength' }),
  email: z.string().email({ message: 'invalidEmail' }),
  password: z.string().min(8, { message: 'minLength' }),
  role: z.string().nonempty({ message: 'required' }),
  acceptTerms: z.boolean().refine(val => val === true, { message: 'required' }),
});

type RegistrationData = z.infer<typeof RegistrationSchema>;

function RegistrationForm() {
  const { register, handleSubmit, formState } = useForm<RegistrationData>({
    resolver: zodResolver(RegistrationSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: RegistrationData) => {
    console.log('Form submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RDU_InputText
        name="username"
        feature="registration"
        id="username"
        maxLength={50}
        autoComplete="username"
        disabled={false}
        register={register}
        formState={formState}
        schema={RegistrationSchema}
        errorMsg={true}
        successMsg={true}
        helpMsg={true}
      />

      <RDU_InputEmail
        name="email"
        feature="registration"
        id="email"
        maxLength={100}
        autoComplete="email"
        disabled={false}
        register={register}
        formState={formState}
        schema={RegistrationSchema}
        errorMsg={true}
        successMsg={true}
      />

      <RDU_InputPassword
        name="password"
        feature="registration"
        id="password"
        maxLength={100}
        autoComplete="new-password"
        disabled={false}
        register={register}
        formState={formState}
        schema={RegistrationSchema}
        errorMsg={true}
        helpMsg={true}
      />

      <RDU_Select
        name="role"
        feature="registration"
        id="role"
        options={['Admin', 'User', 'Guest']}
        autoComplete="none"
        disabled={false}
        register={register}
        formState={formState}
        schema={RegistrationSchema}
        errorMsg={true}
      />

      <RDU_InputCheckbox
        name="acceptTerms"
        feature="registration"
        id="terms"
        label="Accept terms"
        disabled={false}
        register={register}
        formState={formState}
        schema={RegistrationSchema}
        errorMsg={true}
      />

      <RDU_Button type="submit" text="Register" variant="primary" />
      <RDU_Button type="button" text="Cancel" variant="secondary" />
    </form>
  );
}
```

### Applicazione completa con tutti i provider

```typescript
import { Provider } from 'react-redux';
import {
  DialogProvider,
  OffcanvasProvider,
  LoaderProvider,
  ErrorProvider,
} from 'react-develop-universe';
import { FaTimes, FaSpinner } from 'react-icons/fa';
import store from './store';
import './i18n';  // Inizializza window.t

function App() {
  return (
    <Provider store={store}>
      <LoaderProvider 
        loaderComponent={
          <div className="custom-loader">
            <FaSpinner className="spinner" />
            <p>Loading...</p>
          </div>
        }
      >
        <ErrorProvider closeIcon={<FaTimes />}>
          <DialogProvider closeIcon={<FaTimes />}>
            <OffcanvasProvider closeIcon={<FaTimes />}>
              <MainApp />
            </OffcanvasProvider>
          </DialogProvider>
        </ErrorProvider>
      </LoaderProvider>
    </Provider>
  );
}

export default App;
```

---

## Supporto e Contributi

### Versioning

La libreria segue [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: Nuove funzionalità retrocompatibili
- **PATCH**: Bug fixes

### Changelog

Consulta il file `CHANGELOG.md` per le note di rilascio complete.

### Licenza

Verifica la licenza nel file `package.json` del progetto.

---

## Riferimenti

- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Axios](https://axios-http.com/)
- [MSAL.js](https://github.com/AzureAD/microsoft-authentication-library-for-js)

---

**Versione documentazione**: 1.0.0  
**Ultima modifica**: Gennaio 2026  
**Versione libreria**: 19.6.9

