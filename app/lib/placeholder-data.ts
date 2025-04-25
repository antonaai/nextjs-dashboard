const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'Antonio Aiello',
    email: 'antonio@example.com',
    password_hash: '123456',
    role: 'admin',
    created_at: new Date().toISOString(),
  },
  {
    id: '13d07535-c59e-4157-a011-f8d2ef4e0cbb',
    name: 'Antonietta D\'Apuzzo',
    email: 'antonietta@example.com',
    password_hash: '123456',
    role: 'staff',
    created_at: new Date().toISOString(),
  },
];

const clients = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Mario Rossi',
    email: 'mario.rossi@email.com',
    phone: '3291234567',
    notes: 'Cliente storico',
    created_by: users[0].id,
    created_at: new Date().toISOString(),
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Anna Verdi',
    email: 'anna.verdi@email.com',
    phone: '3289876543',
    notes: 'Richiede consulenze mensili',
    created_by: users[1].id,
    created_at: new Date().toISOString(),
  },
];

const practices = [
  {
    id: 'b8c9d3b3-6d14-42f4-ae6e-7ae71d405a7a',
    name: 'Consulenza SEO',
    description: 'Ottimizzazione per i motori di ricerca',
    price: 150,
    duration_min: 60,
    created_at: new Date().toISOString(),
  },
  {
    id: '7dcfa18e-fc36-4ff2-a221-e9855d19548a',
    name: 'Strategia Social Media',
    description: 'Pianificazione e gestione contenuti',
    price: 120,
    duration_min: 45,
    created_at: new Date().toISOString(),
  },
];

const appointments = [
  {
    id: 'bd5c43e5-c0a7-4c9b-8fa3-6909bbf18e04',
    client_id: clients[0].id,
    practice_id: practices[0].id,
    user_id: users[0].id,
    start_time: '2025-04-25T10:00:00.000Z',
    end_time: '2025-04-25T11:00:00.000Z',
    status: 'confirmed',
    notes: 'Focus su homepage',
    created_at: new Date().toISOString(),
  },
  {
    id: '5a6e7490-0570-4cb9-a823-f926a9bcb2f1',
    client_id: clients[1].id,
    practice_id: practices[1].id,
    user_id: users[1].id,
    start_time: '2025-04-26T14:00:00.000Z',
    end_time: '2025-04-26T14:45:00.000Z',
    status: 'confirmed',
    notes: 'Analisi profilo Instagram',
    created_at: new Date().toISOString(),
  },
];

const payments = [
  {
    id: 'b84a814e-8a27-4e03-9319-8a9d6cb7c1c1',
    client_id: clients[0].id,
    appointment_id: appointments[0].id,
    amount: 150,
    method: 'card',
    paid_at: '2025-04-25T11:10:00.000Z',
    notes: 'Pagamento completato',
  },
  {
    id: 'f2c96a12-bd09-4e88-99db-4fa568828f6e',
    client_id: clients[1].id,
    appointment_id: appointments[1].id,
    amount: 120,
    method: 'paypal',
    paid_at: '2025-04-26T15:00:00.000Z',
    notes: 'Fattura inviata',
  },
];

const tags = [
  {
    id: 'cc27c14a-0acf-4f4a-a6c9-d45682c144b9',
    name: 'VIP',
    type: 'client',
  },
  {
    id: '87cf9cfc-2e03-4bc9-a5c3-163d1162cb11',
    name: 'Marketing',
    type: 'practice',
  },
];

const client_tags = [
  {
    client_id: clients[0].id,
    tag_id: tags[0].id,
  },
];

const practice_tags = [
  {
    practice_id: practices[1].id,
    tag_id: tags[1].id,
  },
];

export {
  users,
  clients,
  practices,
  appointments,
  payments,
  tags,
  client_tags,
  practice_tags
};
