<template>
    <!-- FORM HEADING-->
    <div class="heading">
        <b class="p-2">SAMPLE FORM</b>
    </div>

    <!-- Loop through the dynamic form groups and render each section with a unique key -->
    <div v-for="(form, index) in forms" :key="index" class="formSection">
        <!-- Form to submit data for each dynamic group of inputs -->
        <form @submit.prevent="submitForm(index)" class="p-4 border rounded shadow-sm bg-light">

            <!--  Name and Email Input Fields with mandatory marker-->
            <div class="row mb-3 align-items-center">
                <div class="col-md-2 text-start">
                    <label for="name" class="form-label"><b>Name:<span class="text-danger">*</span></b></label>
                </div>
                <div class="col-md-4 text-start">
                    <input v-model="form.name" id="name" type="text" placeholder="Name" class="form-control" />
                </div>

                <div class="col-md-2 text-start">
                    <label for="email" class="form-label"><b>Email Address:<span
                                class="text-danger">*</span></b></label>
                </div>
                <div class="col-md-4 text-start">
                    <input v-model="form.email" id="email" type="email" placeholder="Email" class="form-control" />
                </div>
            </div>

            <!-- Mobile Number and Date of Birth Fields with formatting  -->
            <div class="row mb-3 align-items-center">
                <div class="col-md-2 text-start">
                    <label for="number" class="form-label"><b>Mobile Number:<span
                                class="text-danger">*</span></b></label>
                </div>
                <div class="col-md-4 text-start">
                    <input v-model="form.mobile" type="text" id="number" placeholder="(844) 448-0110"
                        @input="formatMobile" class="form-control" />
                </div>

                <div class="col-md-2 text-start">
                    <label for="dateBirth" class="form-label"><b>D.O.B:<span class="text-danger">*</span></b></label>
                </div>
                <div class="col-md-4 text-start">
                    <input type="date" id="dateBirth" v-model="form.birthdate" class="form-control" />
                </div>
            </div>

            <!-- Gender Radio Buttons for Male and Female -->
            <div class="row mb-3 align-items-center">
                <div class="col-md-2 text-start">
                    <b>Gender:<span class="text-danger">*</span></b>
                </div>
                <div class="col-md-10 text-start">
                    <div class="form-check form-check-inline">
                        <input type="radio" id="male" name="gender" value="Male" v-model="form.gender"
                            class="form-check-input" />
                        <label class="form-check-label" for="male">Male</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input type="radio" id="female" name="gender" value="Female" v-model="form.gender"
                            class="form-check-input" />
                        <label class="form-check-label" for="female">Female</label>
                    </div>
                </div>
            </div>

            <!-- Language Checkbox Options (Angular, Vuejs, ReactJs) -->
            <div class="row mb-3 align-items-center">
                <div class="col-md-2 text-start">
                    <b>Language:</b>
                </div>
                <div class="col-md-10 text-start">
                    <!-- Loop through language options and display checkboxes -->
                    <div class="form-check form-check-inline" v-for="lang in ['Angular', 'Vuejs', 'ReactJs']"
                        :key="lang">
                        <input type="checkbox" :id="lang.toLowerCase()" :value="lang" v-model="form.languages"
                            class="form-check-input" />
                        <label class="form-check-label" :for="lang.toLowerCase()">{{ lang }}</label>
                    </div>
                </div>
            </div>

            <!-- City Selection and File Upload Fields -->
            <div class="row mb-3 align-items-center">
                <div class="col-md-2 text-start">
                    <b>City:</b>
                </div>
                <div class="col-md-4 text-start">
                    <!-- City Multi-Select Dropdown -->
                    <select multiple v-model="form.cities" id="city" class="form-select">
                        <option v-for="city in cityList" :key="city" :value="city">{{ city }}</option>
                    </select>
                </div>

                <div class="col-md-2 text-start">
                    <b>File Upload:</b>
                </div>
                <div class="col-md-4 text-start">
                    <!-- File Upload Field for JPEG and PDF -->
                    <input type="file" id="file" @change="handleFile(index)" accept="image/jpeg,application/pdf"
                        class="form-control" />
                </div>
            </div>

            <!-- Buttons for Adding More Form, Removing Form, and Submitting the Form -->
            <div class="row mt-4">
                <div class="col-md-6">
                    <button type="button" @click="addGroup" class="btn btn-outline-primary me-2">Add More</button>
                    <button v-if="forms.length > 2" type="button" @click="removeGroup"
                        class="btn btn-outline-danger">Remove</button>
                </div>
                <div class="col-md-6 text-end">
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>
            </div>
        </form>
    </div>

    <!-- TABLE OUTPUT -->
    <div class="row">
        <!-- The FormTable component is passed 'submittedData' as a prop to render the submitted form data in a table view -->
        <FormTable v-if="submittedData.length" :rows="submittedData" />
    </div>
</template>


<script>
import FormTable from "./tableDisplay.vue";
// import api from "../services/apiService";

export default {
    name: 'formSection',
    // Registering the FormTable component used to display submitted data
    components: { FormTable },

    data() {
        return {
            // Dynamic list of form groups; minimum two as required
            forms: [
                {
                    name: "",
                    email: "",
                    mobile: "",
                    birthdate: "",
                    gender: "",
                    languages: [],
                    cities: [],
                    file: null
                },
                {
                    name: "",
                    email: "",
                    mobile: "",
                    birthdate: "",
                    gender: "",
                    languages: [],
                    cities: [],
                    file: null
                }],
            // Predefined city list for multi-select dropdown
            cityList: [
                "New York", "Los Angeles", "Chicago", "Houston", "Phoenix",
                "Miami", "Dallas", "Austin", "San Diego", "Seattle"
            ],
            // Stores all submitted forms for displaying results in table without page refresh
            submittedData: [],
        };
    },

    methods: {
        // Adds a new form group on clicking ADD MORE button 
        addGroup() {
            this.forms.push({
                name: "",
                email: "",
                mobile: "",
                birthdate: "",
                gender: "",
                languages: [],
                cities: [],
                file: null,
            });
        },

        // Removes a form group on clicking REMOVE button, but ensures at least 2 remain
        removeGroup(i) {
            if (this.forms.length > 2) this.forms.splice(i, 1);
        },

        // Handle file upload and store the selected file inside the right form group
        handleFile(index, e) {
            this.forms[index].file = e?.target?.files[0];
        },

        // Format mobile number to (xxx) xxx-xxxx automatically as user types
        formatMobile(e) {
            let digits = e.target.value.replace(/\D/g, "");  // Remove all non-numeric chars
            if (digits.length <= 10) {
                let formatted = digits.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "($1) $2-$3"
                );
                console.log(formatted);
                return formatted;
                // this.group.mobile = formatted;
            }
        },

        // Submit form fields from one specific group on which it is clicked
        async submitForm(index) {
            try {
                const form = this.forms[index];
                const fd = new FormData();

                // Validation for mandatory fields
                if (!form.name || !form.email || !form.mobile || !form.gender || !form.birthdate) {
                    alert("Please fill required fields");
                    return false;
                }

                // Append all form fields into FormData for API submission
                fd.append("name", form.name);
                fd.append("email", form.email);
                fd.append("number", form.mobile);
                fd.append("birthdate", form.birthdate);
                fd.append("gender", form.gender);
                fd.append("languages", JSON.stringify(form.languages));
                fd.append("cities", JSON.stringify(form.cities));
                // File should only be appended if user uploaded one
                if (form.file) fd.append("file", form.file);

                // API Call with JWT token handled by interceptor
                // const res = await api.post("/submit-form", fd);

                // Store form result locally so table updates instantly without refresh
                this.submittedData.push({ ...form });

            } catch (err) {
                // Error handling for API-related issues
                alert("API Error: " + err.response?.data?.message ?? "Unknown error");
            }
        }
    }
};
</script>

<style scoped>
.btn-row {
    display: flex;
    gap: 12px;
}

.formSection {
    padding: 10px;
}

.mandatory-mark {
    color: red;
    font-size: 20px;
}

.heading {
    background: #efd6b5;
    padding: 10px;
    font-size: 22px;
}
</style>
