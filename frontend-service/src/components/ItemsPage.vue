<template>
  <div class="container">
    <h1 class="title">Items</h1>
    <ul class="item-list">
      <li v-for="item in items" :key="item.id" class="item-card">
        <div>
          <h2 class="item-name">{{ item.name }}</h2>
          <p class="item-description">{{ item.description }}</p>
        </div>
        <div class="button-group">
          <button v-if="userRole === 'admin'" @click="editItem(item.id)" class="btn btn-edit">Edit</button>
          <button v-if="userRole === 'admin'" @click="deleteItem(item.id)" class="btn btn-delete">Delete</button>
        </div>
      </li>
    </ul>

    <!-- Form untuk Add atau Update Item -->
    <!-- jika userRole === admin baru muncul -->
    <div v-if="userRole === 'admin'" class="form">
      <form @submit.prevent="submitItem" class="form">
        <h3 class="form-title">{{ isEditing ? 'Update Item' : 'Add New Item' }}</h3>
        <div class="form-group">
          <input v-model="newItem.name" type="text" placeholder="Name" class="input-field" required />
          <input v-model="newItem.description" type="text" placeholder="Description" class="input-field" required />
        </div>
        <button type="submit" class="btn btn-submit">{{ isEditing ? 'Update Item' : 'Add Item' }}</button>
      </form>
    </div>
  </div>
</template>



<script>
import { ref, onMounted } from 'vue';
import axios from '../axios';
import router from '@/router';

function parseJwt (token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export default {
  setup() {
    const items = ref([]);
    const newItem = ref({
      name: '',
      description: ''
    });
    const userRole = ref('user'); // Default role
    const isEditing = ref(false); // New state to track edit mode
    const editingItemId = ref(null); // To store the id of the item being edited

    const fetchItems = async () => {
      try {
        const response = await axios.get(userRole.value === 'admin' ? '/items/admin' : '/items', {
          headers: { Authorization: `${localStorage.getItem('token')}` }
        });
        items.value = response.data;
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Hapus token dan redirect ke login jika 403
          localStorage.removeItem('token');
          console.error('Forbidden: Insufficient privileges. Redirecting to login.');
          // Redirect ke login page
          router.push('/login');
        } else {
          console.error('Failed to fetch items:', error);
        }
      }
    };

    const addItem = async () => {
      try {
        await axios.post('/items/admin', newItem.value, {
          headers: { Authorization: `${localStorage.getItem('token')}` }
        });
        await fetchItems(); // Refresh items list
        newItem.value = { name: '', description: '' }; // Reset input
      } catch (error) {
        console.error('Failed to add item:', error);
      }
    };

    const updateItem = async () => {
      try {
        await axios.put(`/items/admin/${editingItemId.value}`, newItem.value, {
          headers: { Authorization: `${localStorage.getItem('token')}` }
        });
        await fetchItems(); // Refresh items list
        resetForm(); // Reset form after update
      } catch (error) {
        console.error('Failed to update item:', error);
      }
    };

    const editItem = (id) => {
      if (userRole.value === 'admin') {
        const item = items.value.find((item) => item.id === id);
        newItem.value = { ...item }; // Copy item to newItem
        isEditing.value = true; // Switch to edit mode
        editingItemId.value = id; // Store the id of the item being edited
      } else {
        console.error('Unauthorized: Cannot edit item.');
      }
    };

    const deleteItem = async (id) => {
      if (userRole.value === 'admin') {
        try {
          await axios.delete(`/items/admin/${id}`, {
            headers: { Authorization: `${localStorage.getItem('token')}` }
          });
          await fetchItems(); // Refresh items list
        } catch (error) {
          console.error('Failed to delete item:', error);
        }
      } else {
        console.error('Unauthorized: Cannot delete item.');
      }
    };

    const submitItem = () => {
      if (isEditing.value) {
        updateItem(); // Call update function if in edit mode
      } else {
        addItem(); // Call add function if in add mode
      }
    };

    const resetForm = () => {
      newItem.value = { name: '', description: '' }; // Reset form fields
      isEditing.value = false; // Exit edit mode
      editingItemId.value = null; // Clear editing item id
    };

    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = parseJwt(token);
          userRole.value = decoded.role || 'user';
        } catch (error) {
          console.error('Failed to decode token:', error);
        }
      }
      fetchItems();
    });

    return {
      items,
      newItem,
      userRole,
      isEditing,
      fetchItems,
      addItem,
      updateItem,
      editItem,
      deleteItem,
      submitItem,
      resetForm
    };
  }
};
</script>


<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.item-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.item-name {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
}

.item-description {
  color: #666;
}

.button-group {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-edit {
  background: #000;
  color: #fff;
}

.btn-edit:hover {
  background: #333;
}

.btn-delete {
  background: #d9534f;
  color: #fff;
}

.btn-delete:hover {
  background: #c9302c;
}

.form {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
}

.form-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  margin-top: 1rem;
  display: flex;
}

.input-field {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.input-field:focus {
  border-color: #000;
  outline: none;
}

.btn-submit {
  background: #000;
  color: #fff;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

.btn-submit:hover {
  background: #333;
}
</style>
