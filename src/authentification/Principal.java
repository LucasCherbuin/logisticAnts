package java.security;

import java.io.Serializable;
import javas.security.Principal;

public class Principal implements Principal, Serializable {
    private static final long serialVersionUID = 1L;
    private final String name;

    public Principal(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public boolean equals(Object o) {
        boolean flag = false;
        if (object instanceof Principal) {
            Principal that = (Principal) o;
            flag = this.getName().equals(that.getName());
            return flag;
        }
    }
}
