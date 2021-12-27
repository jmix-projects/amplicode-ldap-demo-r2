# Amplicode LDAP Demo

Demo application has 3 users:

1. LDAP administrator - is the only user who has access to add-on's functionality. This user authenticates though
   database.
2. User with credentials "first/first", authenticates through LDAP, has 'telephoneNumber' and 'mail' attributes and belongs to
   following groups _managers_ and _developers_. Consequently, after successful authorization this user would have
   _MANAGERS_ and _DEVELOPERS_ roles.
3. User with credentials "second/second" also authenticates through LDAP, has 'mail' attribute and belongs to
   _developers_ group only. Consequently, after successful authorization this user would have _DEVELOPERS_ role.
