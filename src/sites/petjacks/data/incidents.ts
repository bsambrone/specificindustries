import type { Species } from "./products"

export interface Incident {
  id: string
  date: string
  species: Species
  petName: string
  model: string
  classification: "Re-Entry Anomaly" | "Propulsion Event" | "Unscheduled Ascent" | "Harness Discompatibility" | "Recovery Window Exceeded" | "Capsule Integrity Event"
  outcome: string
  notes: string
}

export const incidents: Incident[] = [
  { id: "PJ-2024-0012", date: "2024-02-11", species: "cat",    petName: "Butterbean",   model: "Whiskerwings 300", classification: "Re-Entry Anomaly",       outcome: "Returned to Earth (partially)",    notes: "Eastward drift attributed to cross-breeze; primary recovery successful." },
  { id: "PJ-2024-0017", date: "2024-02-24", species: "dog",    petName: "Barnaby",      model: "Pupjet Ultra",     classification: "Propulsion Event",       outcome: "Mission Concluded",                 notes: "Thrust asymmetry detected at T+4s. Operator awarded commemorative frame." },
  { id: "PJ-2024-0023", date: "2024-03-09", species: "rabbit", petName: "Turnip",       model: "Hopperlauncher LX", classification: "Harness Discompatibility", outcome: "Non-Recoverable",                  notes: "Ear alignment verified post-launch; forward progress not recovered." },
  { id: "PJ-2024-0031", date: "2024-03-22", species: "fish",   petName: "Blinky",       model: "FinFlyer AquaPro", classification: "Capsule Integrity Event", outcome: "Aquatic Return Unsuccessful",       notes: "Seal failure at 42 seconds; return-to-tank window exceeded." },
  { id: "PJ-2024-0043", date: "2024-04-14", species: "cat",    petName: "Mr. Pickles",  model: "Whiskerwings 300", classification: "Unscheduled Ascent",     outcome: "Mission Concluded (Successfully)",  notes: "Gained 340 ft above expected ceiling. Recovery rate remains within envelope." },
  { id: "PJ-2024-0051", date: "2024-05-02", species: "dog",    petName: "Biscuit",      model: "Pupjet Ultra",     classification: "Re-Entry Anomaly",       outcome: "Mission Concluded (Successfully)",  notes: "Soft-field touchdown following rooftop contact; owner delighted." },
  { id: "PJ-2024-0062", date: "2024-05-19", species: "dog",    petName: "Nugget",       model: "Pupjet Ultra",     classification: "Propulsion Event",       outcome: "Non-Recoverable",                   notes: "Batch PJU-2024-F subject to subsequent voluntary recall." },
  { id: "PJ-2024-0068", date: "2024-06-03", species: "rabbit", petName: "Clover",       model: "Hopperlauncher LX", classification: "Recovery Window Exceeded", outcome: "Mission Concluded (Successfully)", notes: "Located within 8-mile radius of launch site the following morning." },
  { id: "PJ-2024-0072", date: "2024-06-11", species: "fish",   petName: "Sir Bartholomew", model: "FinFlyer AquaPro", classification: "Capsule Integrity Event", outcome: "Aquatic Return Successful",     notes: "Capsule returned to tank with 7 seconds of life-support reserve." },
  { id: "PJ-2024-0089", date: "2024-07-04", species: "cat",    petName: "Dumpling",     model: "Whiskerwings 300", classification: "Unscheduled Ascent",     outcome: "Mission Concluded (Successfully)",  notes: "Independence Day launch; family reported emotional cohesion." },
  { id: "PJ-2024-0097", date: "2024-07-21", species: "rabbit", petName: "Beanbag",      model: "Hopperlauncher LX", classification: "Harness Discompatibility", outcome: "Non-Recoverable",                  notes: "Harness nominally correct; rabbit deemed non-compliant post-hoc." },
  { id: "PJ-2024-0104", date: "2024-08-07", species: "dog",    petName: "Captain Noodle", model: "Pupjet Ultra",   classification: "Re-Entry Anomaly",       outcome: "Mission Concluded",                 notes: "Memorialized in Mission Gallery." },
  { id: "PJ-2024-0118", date: "2024-09-02", species: "rabbit", petName: "Petal",        model: "Hopperlauncher LX", classification: "Re-Entry Anomaly",       outcome: "Mission Concluded (Successfully)", notes: "Textbook landing within the Drexler family backyard." },
  { id: "PJ-2024-0127", date: "2024-09-15", species: "dog",    petName: "Biscuit Jr.",  model: "Pupjet Ultra",     classification: "Unscheduled Ascent",     outcome: "Mission Concluded (Successfully)",  notes: "Father-son launch; both recovered. Press coverage positive." },
  { id: "PJ-2024-0141", date: "2024-10-08", species: "cat",    petName: "Apricot",      model: "Whiskerwings 300", classification: "Propulsion Event",       outcome: "Mission Concluded",                 notes: "Memorialized in Mission Gallery." },
  { id: "PJ-2024-0156", date: "2024-11-01", species: "fish",   petName: "Moonbeam",     model: "FinFlyer AquaPro", classification: "Capsule Integrity Event", outcome: "Aquatic Return Successful",        notes: "Iridescent re-entry reported. See Mission Gallery." },
  { id: "PJ-2024-0169", date: "2024-11-21", species: "rabbit", petName: "Waffle",       model: "Hopperlauncher LX", classification: "Recovery Window Exceeded", outcome: "Mission Concluded",                notes: "Memorialized in Mission Gallery." },
  { id: "PJ-2024-0183", date: "2024-12-12", species: "cat",    petName: "Sergeant Mittens", model: "Whiskerwings 300", classification: "Re-Entry Anomaly",    outcome: "Mission Concluded (Successfully)", notes: "Soft-field touchdown following fence-line contact." },
  { id: "PJ-2025-0004", date: "2025-01-09", species: "dog",    petName: "Pepper",       model: "Pupjet Ultra",     classification: "Propulsion Event",       outcome: "Non-Recoverable",                   notes: "Batch PJU-2025-A subject to voluntary recall the following week." },
  { id: "PJ-2025-0011", date: "2025-02-04", species: "fish",   petName: "Stardust",     model: "FinFlyer AquaPro", classification: "Capsule Integrity Event", outcome: "Aquatic Return Unsuccessful",       notes: "Seal failure at 18 seconds; recovery not attempted." },
]
