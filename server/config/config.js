// Puerto
process.env.PORT = process.env.PORT || 3000;

// Vencimiento del token
process.env.CADUCIDAD_TOKEN =60 *60 * 24 * 30;

// Seed para el tokem

process.env.SEED_DE_AUTENTICACION = process.env.SEED_DE_AUTENTICACION || 'este-es-el-seed-desarrollo'