
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

// Add 
app.post("/patient", async (req, res) => {
    try {
        const { nom, prenom, date_naissance, address, telephone } = req.body;
        const newPatient = await pool.query(
            "INSERT INTO patient (nom, prenom, date_naissance, address, telephone) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [nom, prenom, date_naissance, address, telephone]
        );
        res.json(newPatient.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//  search 
app.get("/patient", async (req, res) => {
    try {
        let query = "SELECT * FROM patient";
        const { nom } = req.query;
        if (nom) {
            query += ` WHERE nom LIKE '%${nom}%'`;
        }
        const allPatients = await pool.query(query);  
        res.json(allPatients.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// edit
app.put("/patient/:n_dossier", async (req, res) => {
    try {
        const { n_dossier } = req.params;
        const { nom, prenom, date_naissance, address, telephone } = req.body;
        const updatedPatient = await pool.query(
            "UPDATE patient SET nom = $1, prenom = $2, date_naissance = $3, address = $4, telephone = $5 WHERE n_dossier = $6 RETURNING *",
            [nom, prenom, date_naissance, address, telephone, n_dossier]
        );
        if (updatedPatient.rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }
        res.json(updatedPatient.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//delet 
app.delete("/patient/:n_dossier", async (req, res) => {
    try {
        const { n_dossier } = req.params;

        // Perform the delete query
        const deletedPatient = await pool.query(
            "DELETE FROM patient WHERE n_dossier = $1 RETURNING *",
            [n_dossier]
        );

        // Check if the patient was found and deleted
        if (deletedPatient.rows.length === 0) {
            return res.status(404).json({ message: "Patient not found" });
        }

        // Respond with the deleted patient data
        res.json(deletedPatient.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/familiaux', async (req, res) => {
  try {
      const result = await pool.query("SELECT antecedent_id, nom_antecedent FROM Antecedents WHERE type_antecedent = 'Familiaux'");
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

app.get('/chirurgicaux', async (req, res) => {
  try {
      const result = await pool.query("SELECT antecedent_id, nom_antecedent FROM Antecedents WHERE type_antecedent = 'Chirurgicaux'");
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

app.get('/medicaux', async (req, res) => {
  try {
      const result = await pool.query("SELECT antecedent_id, nom_antecedent FROM Antecedents WHERE type_antecedent = 'Medicaux'");
      res.json(result.rows);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

app.post('/antecedents', async (req, res) => {
  const { n_dossier, antecedent_ids } = req.body; // Change antecedent_id to antecedent_ids

  if (!Array.isArray(antecedent_ids) || !n_dossier) {
      return res.status(400).send('Bad request');
  }

  try {
      const queries = antecedent_ids.map(antecedent_id => {
          return pool.query(
              "INSERT INTO avoir_antecedents (antecedent_id, n_dossier) VALUES ($1, $2)",
              [antecedent_id, n_dossier]
          );
      });

      await Promise.all(queries);
      res.status(201).send('Antecedents added');
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});








//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Route pour créer une consultation
// Route pour créer une consultation
app.post('/consultation', async (req, res) => {
    const {
        n_dossier,
        motif_consultation,
        etat_general,
        taille,
        poids,
        pression_arterielle,
        urogenital,
        abdominal,
        glycemie,
        uree,
        crea,
        fns,
        crp,
        echographie,
        tdm,
        irm,
        autres,
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO consultation (patient_id, date_consultation, motif_consultation, etat_general, taille, poids, pression_arterielle, urogenital, abdominal, glycemie, uree, crea, fns, crp, echographie, tdm, irm, autres) 
             VALUES ($1, NOW(), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
            [
                n_dossier,
                motif_consultation || null,
                etat_general || null,
                taille || null,
                poids || null,
                pression_arterielle || null,
                urogenital || null,
                abdominal || null,
                glycemie || null,
                uree || null,
                crea || null,
                fns || null,
                crp || null,
                echographie || null,
                tdm || null,
                irm || null,
                autres || null,
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement de la consultation:', error.message);
        res.status(500).send('Erreur serveur');
    }
});










app.post('/bilan', async (req, res) => {
    const {
      n_dossier,
      groupage,
      fns,
      glycemie,
      creatininemie,
      uree,
      serologie,
      tck_tp_inr,
      fibrinogene,
      ionogramme_sanguin,
      bilan_hepatite,
      ldh,
      bilan_lipidique,
      lipasemie,
      calcemie,
      phosphoremie,
      tsh,
      t3_t4,
      thyrocalcitonine,
      ac_anti_thyroglobuline,
      psa,
      marqueur_tumoral,
      crp_vs,
      fer_serique,
      ferritine,
      troponines,
      bilan_protidine,
      fsh_lh,
      taux_de_prolactine,
      progesterone,
      oestrogenes,
      testosterone,
      beta_hcg,
      vitamine_d,
      chimie_des_urines,
      ecbu,
      bilan_inflammatoire,
      hbaic,
      d_dimetres,
      acide_urique,
      autre,
    } = req.body;
  
    try {
      const result = await pool.query(
        `INSERT INTO bilan (n_dossier, groupage, fns, glycemie, creatininemie, uree, serologie, tck_tp_inr, fibrinogene, ionogramme_sanguin, bilan_hepatite, ldh, bilan_lipidique, lipasemie, calcemie, phosphoremie, tsh, t3_t4, thyrocalcitonine, ac_anti_thyroglobuline, psa, marqueur_tumoral, crp_vs, fer_serique, ferritine, troponines, bilan_protidine, fsh_lh, taux_de_prolactine, progesterone, oestrogenes, testosterone, beta_hcg, vitamine_d, chimie_des_urines, ecbu, bilan_inflammatoire, hbaic, d_dimetres, acide_urique, autre)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41)
         RETURNING *`,
        [
          n_dossier,
          groupage || false,
          fns || false,
          glycemie || false,
          creatininemie || false,
          uree || false,
          serologie || false,
          tck_tp_inr || false,
          fibrinogene || false,
          ionogramme_sanguin || false,
          bilan_hepatite || false,
          ldh || false,
          bilan_lipidique || false,
          lipasemie || false,
          calcemie || false,
          phosphoremie || false,
          tsh || false,
          t3_t4 || false,
          thyrocalcitonine || false,
          ac_anti_thyroglobuline || false,
          psa || false,
          marqueur_tumoral || false,
          crp_vs || false,
          fer_serique || false,
          ferritine || false,
          troponines || false,
          bilan_protidine || false,
          fsh_lh || false,
          taux_de_prolactine || false,
          progesterone || false,
          oestrogenes || false,
          testosterone || false,
          beta_hcg || false,
          vitamine_d || false,
          chimie_des_urines || false,
          ecbu || false,
          bilan_inflammatoire || false,
          hbaic || false,
          d_dimetres || false,
          acide_urique || false,
          autre || '',
        ]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement du bilan:', error.message);
      res.status(500).send('Erreur serveur');
    }
  });






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Ajouter un nouveau médicament
app.post("/medicament", async (req, res) => {
    try {
        const { designation, dosage, forme, description } = req.body;
        const newMedicament = await pool.query(
            "INSERT INTO medicaments (designation, dosage, forme, description) VALUES ($1, $2, $3, $4) RETURNING *",
            [designation, dosage, forme, description]
        );
        res.json(newMedicament.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Récupérer tous les médicaments
app.get("/medicament", async (req, res) => {
    try {
        const allMedicaments = await pool.query("SELECT * FROM medicaments");
        res.json(allMedicaments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Mettre à jour un médicament
app.put("/medicament/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { designation, dosage, forme, description } = req.body;
        const updatedMedicament = await pool.query(
            "UPDATE medicaments SET designation = $1, dosage = $2, forme = $3, description = $4 WHERE id_medicaments = $5 RETURNING *",
            [designation, dosage, forme, description, id]
        );
        if (updatedMedicament.rows.length === 0) {
            return res.status(404).json({ message: "Medicament not found" });
        }
        res.json(updatedMedicament.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Supprimer un médicament
app.delete("/medicament/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMedicament = await pool.query(
            "DELETE FROM medicaments WHERE id_medicaments = $1 RETURNING *",
            [id]
        );
        if (deletedMedicament.rows.length === 0) {
            return res.status(404).json({ message: "Medicament not found" });
        }
        res.json(deletedMedicament.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});
// Route pour obtenir tous les médicaments///////////////////////////////////////////////
app.get('/medicaments', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM medicaments');
        res.json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération des médicaments:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des médicaments' });
    }
});



////////////////////////////////////////////////////////////////////


  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  




































    













