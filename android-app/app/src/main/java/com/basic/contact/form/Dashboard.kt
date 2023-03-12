package com.basic.contact.form

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.marginTop
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import org.w3c.dom.Text

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
        val linearLayout = findViewById<LinearLayout>(R.id.items)
        db.collection("messages")
            .get()
            .addOnSuccessListener { result ->
                for (document in result) {
                    val frameLayout = FrameLayout(this)

                    val contactText = TextView(this)
                    val messageText = TextView(this)
                    val dateText = TextView(this)

                    contactText.text = document.data[("contact")].toString()
                    messageText.text = document.data[("message")].toString()
                    dateText.text = document.data[("date")].toString()

                    //frameLayout.addView(contactText)
                    //frameLayout.addView(messageText)
                    //frameLayout.addView(dateText)

                    linearLayout.addView(contactText)
                    linearLayout.addView((messageText))
                    linearLayout.addView((dateText))

                    Log.d("data", "${document.id} => ${document.data}")
                }
            }
            .addOnFailureListener { exception ->
                Log.w("err", "Error getting documents.", exception)
            }
    }
}
