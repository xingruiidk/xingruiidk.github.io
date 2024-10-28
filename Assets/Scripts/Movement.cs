using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Movement : MonoBehaviour
{
    public static Movement instance;
    private float moveSpeed = 5.0f;
    private CharacterController controller;
    private Animator animator;
    public bool isGrounded;
    public LayerMask floorMask;
    private Rigidbody rb;
    public float jumpForce;
    private float gravity = -10;
    private Vector3 moveVel;

    // Start is called before the first frame update
    void Start()
    {
        instance = this;
        controller = GetComponent<CharacterController>();
        animator = GetComponent<Animator>();
        rb = GetComponent<Rigidbody>();
    }

    void Update()
    {
        moveVel.y += gravity * Time.deltaTime;
        controller.Move(moveVel * Time.deltaTime);
        HandleMovement();
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            Jump();
        }
        checkGrounded();
    }

    private void HandleMovement()
    {
        float horizontalInput = Input.GetAxis("Horizontal");
        float verticalInput = Input.GetAxis("Vertical");
        Vector3 moveDirection = (transform.forward * verticalInput + transform.right * horizontalInput).normalized;
        controller.Move(moveDirection * moveSpeed * Time.deltaTime);

        if (isGrounded)
        {
            rb.drag = 5;
            if (horizontalInput != 0 || verticalInput != 0)
            {
                animator.SetFloat("vel", 1);
            }
            else
            {
                animator.SetFloat("vel", 0);
            }
        }
        else
        {
            rb.drag = 0;
        }
    }

    private void Jump()
    {
        moveVel.y = jumpForce;
        //animator.SetTrigger("Jump");
    }
    public void checkGrounded()
    {
        RaycastHit hit;
        if (Physics.Raycast(transform.position + Vector3.up, Vector3.down, out hit, 1.2f, floorMask))
        {
            isGrounded = true;
            Debug.DrawRay(transform.position + Vector3.up, Vector3.down * 1.2f, Color.blue);
        }
        else
        {
            isGrounded = false;
            Debug.DrawRay(transform.position + Vector3.up, Vector3.down * 1.2f, Color.red);
        }
    }
}
