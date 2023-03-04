package authz

import future.keywords.if

default allow := false

allow if {
	user := input.user
	role := "role_0"
	permission := "permission_0"
	user_has_permission(user, role, permission)
}

user_has_permission(user, role, permission) if {
	data.rbac.tuples[user][role][_] == permission
}
