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
        <h1>User Details</h1>
        <div class="flex">
          <base-button
            @click="editTrigger()"
            :title="activeTitle"
          ></base-button>
          <button class="delete" @click="deleteItem">
            <i class="gg-trash"></i>
          </button>
        </div>
      </div>
      <form v-if="loadedUser" @submit.prevent="submit">
        <div class="row">
          <label>Firstname:</label>
          <input type="text" v-model="firstName" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>Lastname:</label>
          <input type="text" v-model="lastName" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>E-mail:</label>
          <input type="email" v-model="email" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>Qualification:</label>
          <input type="text" v-model="qualification" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>Phone Number:</label>
          <input
            type="tel"
            v-model.number="phoneNumber"
            @keypress="isNumber($event)"
            :disabled="!editMode"
          />
        </div>
        <div class="row">
          <label>Address Line 1:</label>
          <input v-model="address1" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>Address Line 2:</label>
          <input v-model="address2" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>City:</label>
          <input type="text" v-model="city" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>State:</label>
          <input type="text" v-model="state" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>ZipCode:</label>
          <input type="text" v-model="zipCode" :disabled="!editMode" />
        </div>
        <div class="row">
          <label>Comments:</label>
          <input type="text" v-model="comments" :disabled="!editMode" />
        </div>
        <base-button
          v-if="editMode"
          class="center"
          title="Submit"
        ></base-button>
      </form>
    </base-container>
  </div>
</template>

<script>
export default {
  props: ["userId"],
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
  created() {
    this.loadUser();
  },
  methods: {
    async loadUser() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("fetchUser", this.userId);
      } catch (error) {
        this.$toast.error("Failed to load record!");
        this.error = error.message || "Failed to fetch user";
      }
      this.isLoading = false;
      this.firstName = this.loadedUser.firstName;
      this.lastName = this.loadedUser.lastName;
      this.email = this.loadedUser.email;
      this.phoneNumber = this.loadedUser.phoneNumber;
      this.address1 = this.loadedUser.address1;
      this.address2 = this.loadedUser.address2;
      this.city = this.loadedUser.city;
      this.state = this.loadedUser.state;
      this.zipCode = this.loadedUser.zipCode;
      this.qualification = this.loadedUser.qualification;
      this.comments = this.loadedUser.comments;
    },
    editTrigger() {
      this.editMode = !this.editMode;
      if (this.editMode == true) {
        return (this.activeTitle = "Cancel");
      } else {
        return (this.activeTitle = "Edit details");
      }
    },
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
        data: {
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
        },
        userId: this.userId,
      };
      try {
        await this.$store.dispatch("updateUser", formData);
        this.$toast.success("User updated!");
        setTimeout(() => {
          this.$router.push("/users");
        }, 100);
      } catch (error) {
        this.error = error.message || "Failed to fetch user";
        this.$toast.error(this.error);
      }
    },
    async deleteItem() {
      try {
        await this.$store.dispatch("deleteUser", this.userId);
      } catch (error) {
        this.error = error.message || "Failed to delete user";
      }
      this.$router.push("/users");
      this.$toast.success("User Deleted!");
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
  computed: {
    loadedUser() {
      return this.$store.getters.user;
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
  justify-content: space-between;
}

.delete {
  background: none;
  border: 2px solid red;
  border-radius: 20px;
  padding: 12.5px 15px;
  cursor: pointer;
  i {
    color: red;
  }
}
</style>
