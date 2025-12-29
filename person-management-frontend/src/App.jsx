import React, { useState, useEffect } from 'react';
import { Search, UserPlus, Edit2, Trash2, X, Check, AlertCircle, Users } from 'lucide-react';


const API_BASE_URL = 'http://localhost:8080/person-management-backend/api/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentPerson, setCurrentPerson] = useState({ id: '', name: '', email: '', age: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Fetch all persons
  const fetchPersons = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Failed to fetch persons');
      const data = await response.json();
      setPersons(data);
      setFilteredPersons(data);
    } catch (err) {
      setError('Error loading persons. Make sure your backend is running on ' + API_BASE_URL);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add person
  const addPerson = async (person) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
      });
      if (!response.ok) throw new Error('Failed to add person');
      await fetchPersons();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Error adding person');
      console.error(err);
    }
  };

  // Update person
  const updatePerson = async (person) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${person.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(person)
      });
      if (!response.ok) throw new Error('Failed to update person');
      await fetchPersons();
      setShowModal(false);
      resetForm();
    } catch (err) {
      setError('Error updating person');
      console.error(err);
    }
  };

  // Delete person
  const deletePerson = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete person');
      await fetchPersons();
      setDeleteConfirm(null);
    } catch (err) {
      setError('Error deleting person');
      console.error(err);
    }
  };

  // Search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredPersons(persons);
    } else {
      const filtered = persons.filter(person =>
        person.name.toLowerCase().includes(term.toLowerCase()) ||
        person.email.toLowerCase().includes(term.toLowerCase()) ||
        person.id.toString().includes(term)
      );
      setFilteredPersons(filtered);
    }
  };

    // Form handlers
  const openAddModal = () => {
    setModalMode('add');
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (person) => {
    setModalMode('edit');
    setCurrentPerson(person);
    setShowModal(true);
  };

  const resetForm = () => {
    setCurrentPerson({ id: '', name: '', email: '', age: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentPerson.name || !currentPerson.email || !currentPerson.age) {
      setError('Please fill all required fields');
      return;
    }

    if (modalMode === 'add') {
      // Exclude `id` when adding a new person
      const { id, ...personData } = currentPerson;
      addPerson(personData);
    } else {
      // Include `id` when updating
      updatePerson(currentPerson);
    }
  };


  useEffect(() => {
    fetchPersons();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Person Management</h1>
                <p className="text-sm text-gray-500">REST API Frontend Application</p>
              </div>
            </div>
            <button
              onClick={openAddModal}
              className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span className="font-semibold">Add Person</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700"
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-800 font-medium">Error</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          </div>
        )}

        {/* Persons Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersons.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No persons found</p>
                <p className="text-gray-400 text-sm">Add your first person to get started</p>
              </div>
            ) : (
              filteredPersons.map((person) => (
                <div
                  key={person.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2"></div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="bg-gradient-to-br from-indigo-100 to-purple-100 w-14 h-14 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">
                          {person.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        ID: {person.id}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{person.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{person.email}</p>
                    <p className="text-gray-500 text-sm mb-4">Age: {person.age}</p>

                    <div className="flex space-x-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => openEditModal(person)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="font-medium">Edit</span>
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(person.id)}
                        className="flex-1 flex items-center justify-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="font-medium">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {modalMode === 'add' ? 'Add New Person' : 'Edit Person'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                <input
                  type="text"
                  value={currentPerson.name}
                  onChange={(e) => setCurrentPerson({ ...currentPerson, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder="Enter name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  value={currentPerson.email}
                  onChange={(e) => setCurrentPerson({ ...currentPerson, email: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Age *</label>
                <input
                  type="number"
                  min="1"
                  max="150"
                  value={currentPerson.age}
                  onChange={(e) => setCurrentPerson({ ...currentPerson, age: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder="Enter age"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium flex items-center justify-center space-x-2"
                >
                  <Check className="w-5 h-5" />
                  <span>{modalMode === 'add' ? 'Add Person' : 'Update Person'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this person? This action cannot be undone.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deletePerson(deleteConfirm)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;