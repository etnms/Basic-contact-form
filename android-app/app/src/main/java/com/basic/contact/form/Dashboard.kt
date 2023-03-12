package com.basic.contact.form

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.widget.Button
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase


class Dashboard : AppCompatActivity() {

    private val db = Firebase.firestore

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.dashboard)

        val signOutBtn = findViewById<Button>(R.id.signout_btn)
        signOutBtn.setOnClickListener(){
            signOut()
        }
    }

    public override fun onStart() {
        super.onStart()
        readData()
    }

    private fun signOut() {
        FirebaseAuth.getInstance().signOut();
        startActivity(Intent(this, MainActivity::class.java))
    }

    private fun readData() {
        db.collection("messages")
            .get()
            .addOnSuccessListener { result ->
                for (document in result) {
                    Log.d("data", "${document.id} => ${document.data}")
                }
            }
            .addOnFailureListener { exception ->
                Log.w("err", "Error getting documents.", exception)
            }
    }
}
