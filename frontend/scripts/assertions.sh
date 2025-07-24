# https://github.com/codeforester/base/blob/master/lib/assertions.sh
assert_var_not_null() {
  local fatal var num_null=0
  [[ "$1" = "-f" ]] && {
    shift
    fatal=1
  }
  for var in "$@"; do
    [[ -z "${!var}" ]] && printf '%s\n' "Variable '$var' not set" >&2 &&
      ((num_null++))
  done

  if ((num_null > 0)); then
    [[ "$fatal" ]] && exit 1
    return 1
  fi
  return 0
}