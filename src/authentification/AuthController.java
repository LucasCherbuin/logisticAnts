@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        try {
            CallbackHandler handler = new JAASCallbackHandler(request);

            LoginContext lc = new LoginContext("SampleLoginModule", handler);

            lc.login();

            Subject subject = lc.getSubject();

            if (subject != null && !subject.getPrincipals().isEmpty()) {
                String token = UUID.randomUUID().toString();

                return ResponseEntity.ok(new LoginResponse(
                        token,
                        subject.getPrincipals().toString()
                ));
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage());
        }
    }
}