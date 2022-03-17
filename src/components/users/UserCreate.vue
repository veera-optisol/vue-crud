<template>
  <div>
    <base-dialog
      v-if="inputIsInvalid"
      title="Invalid input"
      @close="confirmError"
    >
      <template #default>
        <p>Please fill in all input fields with valid data.</p>
      </template>
      <template #actions>
        <base-button @click="confirmError" title="Okay"></base-button>
      </template>
    </base-dialog>
    <base-container>
      <div class="flex">
        <h1>Create new user</h1>
      </div>
      <form @submit.prevent="submit">
        <div class="row">
          <label>Firstname:</label>
          <input type="text" v-model="firstName" />
        </div>
        <div class="row">
          <label>Lastname:</label>
          <input type="text" v-model="lastName" />
        </div>
        <div class="row">
          <label>E-mail:</label>
          <input type="email" v-model="email" />
        </div>
        <div class="row">
          <label>Qualification:</label>
          <input type="text" v-model="qualification" />
        </div>
        <div class="row">
          <label>Phone Number:</label>
          <input
            type="tel"
            v-model.number="phoneNumber"
            @keypress="isNumber($event)"
          />
        </div>
        <div class="row">
          <label>Address Line 1:</label>
          <input v-model="address1" />
        </div>
        <div class="row">
          <label>Address Line 2:</label>
          <input v-model="address2" />
        </div>
        <div class="row">
          <label>City:</label>
          <input type="text" v-model="city" />
        </div>
        <div class="row">
          <label>State:</label>
          <input type="text" v-model="state" />
        </div>
        <div class="row">
          <label>ZipCode:</label>
          <input type="text" v-model="zipCode" />
        </div>
        <div class="row">
          <label>Comments:</label>
          <input type="text" v-model="comments" />
        </div>
        <base-button class="center" title="Submit"></base-button>
      </form>
    </base-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      search: "",
      editMode: false,
      activeTitle: "Edit details",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      qualification: "",
      comments: "",
      inputIsInvalid: false,
    };
  },
  methods: {
    async submit() {
      if (
        this.firstName.trim() === "" ||
        this.lastName.trim() === "" ||
        this.email.trim() === "" ||
        this.phoneNumber.trim() === "" ||
        this.address1.trim() === "" ||
        this.address2.trim() === "" ||
        this.city.trim() === "" ||
        this.state.trim() === "" ||
        this.zipCode.trim() === "" ||
        this.qualification.trim() === "" ||
        this.comments.trim() === ""
      ) {
        this.inputIsInvalid = true;
        return;
      }

      let formData = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phoneNumber: this.phoneNumber,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        state: this.state,
        zipCode: this.zipCode,
        qualification: this.qualification,
        comments: this.comments,
      };
      try {
        await this.$store.dispatch("createUser", formData);
        this.$toast.success("User created!");
        setTimeout(() => {
          this.$router.push("/users");
        }, 100);
      } catch (error) {
        this.error = error.message || "Email already exists!";
        this.$toast.error(this.error);
      }
    },
    confirmError() {
      this.inputIsInvalid = false;
    },
    isNumber(evt) {
      const keysAllowed = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
      ];
      const keyPressed = evt.key;

      if (!keysAllowed.includes(keyPressed)) {
        evt.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
.center {
  margin: 15px auto 0;
  display: block;
}
.row {
  padding: 15px 0;
  width: 300px;
  margin: auto;
  label {
    font-weight: bold;
    width: 120px;
    display: inline-block;
    vertical-align: middle;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #ceceec;
  }
}
input,
textarea {
  height: 40px;
  padding: 0 7px;
  border: 1px solid #333;
  vertical-align: middle;
  &:disabled {
    border: none;
    background: none;
  }
}

textarea {
  resize: none;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
