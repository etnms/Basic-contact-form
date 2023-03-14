package com.basic.contact.form

import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import androidx.core.content.ContextCompat
import androidx.core.view.marginTop
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.ktx.firestore
import com.google.firebase.ktx.Firebase
import org.w3c.dom.Text
import java.text.SimpleDateFormat
import java.util.*

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
                    val cardView = CardView(this)
                    cardView.setBackgroundColor(ContextCompat.getColor(this,  R.color.purple_200))


                    val layoutItems = LinearLayout(this)
                    layoutItems.orientation = LinearLayout.VERTICAL

                    val contactText = TextView(this)
                    val messageText = TextView(this)
                    val dateText = TextView(this)

                    contactText.text = document.data[("contact")].toString()
                    messageText.text = document.data[("message")].toString()
                    val timestamp = document.data[("date")] as com.google.firebase.Timestamp
                    val milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
                    val sdf = SimpleDateFormat("dd/MM/yyyy hh:mm:ss")
                    val netDate = Date(milliseconds)
                    val date = sdf.format(netDate).toString()
                    dateText.text = date

                    layoutItems.addView(contactText)
                    layoutItems.addView(messageText)
                    layoutItems.addView(dateText)

                    cardView.addView((layoutItems))
                    linearLayout.addView(cardView)
                    val marginLayoutParams = cardView.layoutParams as ViewGroup.MarginLayoutParams
                    marginLayoutParams.setMargins(30, 16, 30, 16)


                    cardView.layoutParams = marginLayoutParams

                }
            }
            .addOnFailureListener { exception ->
                Log.w("err", "Error getting documents.", exception)
            }
    }
}
