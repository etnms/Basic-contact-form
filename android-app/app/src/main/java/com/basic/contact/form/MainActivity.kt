package com.basic.contact.form

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.appcompat.app.AppCompatActivity
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.basic.contact.form.databinding.ActivityMainBinding
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.ktx.auth
import com.google.firebase.ktx.Firebase

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        auth = Firebase.auth

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        val emailText = findViewById<EditText>(R.id.email)
        val passwordText = findViewById<EditText>(R.id.password)

        val signInBtn = findViewById<Button>(R.id.signin_btn)
        signInBtn.setOnClickListener(){
            signIn(emailText.text.toString(), passwordText.text.toString())
        }
    }

    public override fun onStart() {
        super.onStart()
        // Check if user is signed in (non-null) and update UI accordingly.
        val currentUser = auth.currentUser
        if(currentUser != null){
            Log.d("success login", "success login")
            loadDashboard()
        }
    }

    private fun signIn(email: String, password: String) {
        auth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener(this) { task ->
                if (task.isSuccessful) {
                    // Sign in success, update UI with the signed-in user's information
                    Log.d("success", "signInWithEmail:success")
                    val user = auth.currentUser
                    loadDashboard()
                    //updateUI(user)
                } else {
                    // If sign in fails, display a message to the user.
                    Log.w("failed", "signInWithEmail:failure", task.exception)
                    Toast.makeText(
                        baseContext, "Authentication failed.",
                        Toast.LENGTH_SHORT
                    ).show()
                }
            }
    }

    private fun loadDashboard() {
        startActivity(Intent(this, Dashboard::class.java))
    }
}