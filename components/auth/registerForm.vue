<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Name</v-label>
            <v-text-field v-model="name" variant="outlined" hide-details color="primary"
                :rules="[rules.required]"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Email Address</v-label>
            <v-text-field v-model="email" variant="outlined" type="email" hide-details color="primary"
                :rules="[rules.required, rules.email]"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-bold mb-1">Password</v-label>
            <v-text-field v-model="password" variant="outlined" type="password" hide-details color="primary"
                :rules="[rules.required, rules.password]"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-alert v-if="error" type="error">{{ error }}</v-alert>
        </v-col>
        <v-col cols="12">
            <v-btn :loading="loading" color="#0561fc" size="large" block flat @click="signup">
                Sign up
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const authStore = useAuthStore();
const router = useRouter();

// Validation Rules
const rules = {
    required: (v: string) => !!v || 'This field is required.',
    email: (v: string) => /\S+@\S+\.\S+/.test(v) || 'Invalid email format.',
    password: (v: string) => (v.length >= 6) || 'Password must be at least 6 characters long.',
};

const signup = async () => {
    error.value = '';

    if (!name.value || !email.value || !password.value) {
        error.value = 'All fields are required.';
        return;
    }

    if (!rules.email(email.value)) {
        error.value = 'Please enter a valid email address.';
        return;
    }

    if (!rules.password(password.value)) {
        error.value = 'Password must be at least 6 characters long.';
        return;
    }

    loading.value = true;
    try {
        await authStore.signup({ name: name.value, email: email.value, password: password.value });
        router.push('/auth/login');
    } catch (err: any) {
        error.value = err.message || 'Signup failed.';
    } finally {
        loading.value = false;
    }
};
</script>
