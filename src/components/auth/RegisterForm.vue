<template>
  <v-alert v-if="feedbackMessage" color="error" class="mb-2">{{
    feedbackMessage
  }}</v-alert>
  <v-form @submit.prevent="submit">
    <v-row class="d-flex mb-3">
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Nome</v-label>
        <v-text-field
          v-model="firstName"
          :error-messages="errors.first_name"
          variant="outlined"
          color="primary"
        />
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">E-mail</v-label>
        <v-text-field
          v-model="email"
          :error-messages="errors.email"
          variant="outlined"
          type="email"
          color="primary"
        />
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Senha</v-label>
        <v-text-field
          v-model="password"
          :error-messages="errors.password"
          variant="outlined"
          type="password"
          color="primary"
        />
      </v-col>
      <v-col cols="12">
        <v-btn
          type="submit"
          :loading="isSubmitting"
          color="primary"
          size="large"
          block
          flat
          >Cadastrar</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { useForm, useField } from "vee-validate";
import { object, string } from "yup";
import { useAuthStore } from "@/stores/auth";

const emit = defineEmits(["done"]);
const props = defineProps({
  email: {
    type: String,
    default: "",
  },
  emailDisabled: Boolean,
});

const schema = object({
  first_name: string().required().label("Nome"),
  email: string().required().email().label("E-mail"),
  password: string()
    .required()
    .min(8)
    .matches(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .matches(/[0-9]/, "A senha deve conter pelo menos um número")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "A senha deve conter pelo menos um caractere especial"
    )
    .label("Senha"),
});
const { handleSubmit, errors, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    first_name: "Eriton",
    email: "ee_soares@hotmail.com",
    password: "Eeee123@",
    // first_name: '',
    // email: props.email,
    // password: ''
  },
});
const submit = handleSubmit(async (values) => {
  const authStore = useAuthStore();

  await authStore
    .register(values.first_name, values.email, values.password)
    .then(async () => {
      await authStore.login(values.email, values.password);
      emit("done");
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const apiMessage = error.response.data.message; // Acessa o campo "message" da resposta

        feedbackMessage.value = "O e-mail informado já existe!"; //apiMessage; // Mostra a mensagem específica da API
      }
    });
});
const { value: firstName } = useField("first_name");
const { value: email } = useField("email");
const { value: password } = useField("password");
const feedbackMessage = ref("");
</script>
