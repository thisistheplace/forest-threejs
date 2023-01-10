# AUTO GENERATED FILE - DO NOT EDIT

export forestthreejs

"""
    forestthreejs(;kwargs...)

A ForestThreejs component.

Keyword arguments:
- `id` (String; required)
- `spacing` (Real; optional)
- `stats` (Bool; optional)
- `totalX` (Real; optional)
- `totalZ` (Real; optional)
"""
function forestthreejs(; kwargs...)
        available_props = Symbol[:id, :spacing, :stats, :totalX, :totalZ]
        wild_props = Symbol[]
        return Component("forestthreejs", "ForestThreejs", "forest_threejs", available_props, wild_props; kwargs...)
end

