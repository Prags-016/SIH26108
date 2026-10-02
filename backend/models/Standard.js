const mongoose = require('mongoose');

const amendmentSchema = new mongoose.Schema({
  number: { type: String, required: true },
  date: { type: String, required: true },
  summary: { type: String, required: true }
}, { _id: false });

const latestVersionSchema = new mongoose.Schema({
  designation: { type: String, required: true },
  year: { type: Number, required: true },
  reaffirmed_year: { type: Number, default: null },
  published_on: { type: String, default: null },
  citation: { type: String, default: '' }
}, { _id: false });

const versionHistorySchema = new mongoose.Schema({
  edition: { type: String, required: true },
  year: { type: String, required: true },
  status: {
    type: String,
    enum: ['current', 'withdrawn', 'superseded', 'under_revision'],
    required: true
  },
  gazette_date: { type: String, default: '' },
  remarks: { type: String, default: '' },
  superseded_by: { type: String, default: null }
}, { _id: false });

const referenceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  is_number: { type: String, required: true },
  title: { type: String, required: true }
}, { _id: false });

const certificationSchema = new mongoose.Schema({
  is_mandatory: { type: Boolean, default: false },
  scheme: { type: String, default: '' },
  name: { type: String, default: '' },
  regulatory_order: { type: String, default: '' },
  authority: { type: String, default: '' },
  prohibition_clause: { type: String, default: '' },
  applies_to: { type: String, default: '' },
  basis: { type: String, default: '' },
  notes: { type: String, default: '' }
}, { _id: false });

const standardSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true, trim: true },
  is_number: { type: String, required: true, trim: true },
  part: { type: String, default: '' },
  title: { type: String, required: true },
  relevance_score: { type: Number, min: 0, max: 100, default: 0 },
  reason: { type: String, default: '' },
  scope_summary: { type: String, default: '' },
  scope: { type: String, default: '' },
  ics_code: { type: String, default: '' },
  status: {
    type: String,
    enum: ['current', 'withdrawn', 'superseded', 'under_revision'],
    required: true
  },
  latest_version: { type: latestVersionSchema, required: true },
  amendments: { type: [amendmentSchema], default: [] },
  amendments_label: { type: String, default: '' },
  superseded_by: { type: String, default: null },
  bis_url: { type: String, default: '' },
  version_history: { type: [versionHistorySchema], default: [] },
  normative_references: { type: [referenceSchema], default: [] },
  certification: { type: certificationSchema, default: null },
  keywords: { type: [String], default: [] },
  domain: { type: String, default: '', index: true },
  role: {
    type: String,
    enum: ['primary', 'allied', 'reference'],
    default: 'primary'
  },
  relation_type: { type: String, default: '' },
  related_to: { type: String, default: '' }
}, {
  timestamps: true,
  versionKey: false
});

standardSchema.index(
  { title: 'text', is_number: 'text', scope_summary: 'text', keywords: 'text' },
  { name: 'standard_text', default_language: 'english' }
);

module.exports = mongoose.model('Standard', standardSchema);
