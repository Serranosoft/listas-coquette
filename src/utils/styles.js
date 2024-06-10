export const colors = {
    button: "#cc527a",
    selected: "rgba(230, 34, 114, 0.25)",
    light: "#FACCD6",
    dark: "#cc527a",
    muted: "#858585",
    gray: "#ededed",
}

export const ui = {
    muted: {
        fontFamily: "madimi",
        color: "#858585",
        fontSize: 16
    },
    text: {
        fontFamily: "madimi",
        color: "#fff",
        fontSize: 18.5,
    },
    h1: {
        fontSize: 60,
        fontFamily: "madimi",
        lineHeight: 65,
    },
    h2: {
        fontFamily: "madimi",
        color: "#fff",
        fontSize: 35,
        textAlign: "center"
    },
    h3: {
        fontFamily: "madimi",
        color: "#fff",
        fontSize: 31,
    },
    h4: {
        fontFamily: "madimi",
        color: "#fff",
        fontSize: 22,
    },
    black: {
        color: "#000",
    },
    center: {
        textAlign: "center"
    }
}

export const layout = {
    flex: {
        flex: 1,
    },

    flexHalf: {
        flex: 1 / 2
    },

    white: {
        backgroundColor: "#fff"
    },

    w100: {
        width: "100%"
    },

    title: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    paddingHorizontal: {
        paddingHorizontal: 16
    },

    backgroundLight: {
        backgroundColor: colors.light,
    },

    backgroundWhite: {
        backgroundColor: "#fff",
    },

    contentList: {
        gap: 32,
        paddingTop: 16,
        paddingBottom: 100
    },

    zIndex: {
        zIndex: 1,
    },

    row: {
        flexDirection: "row",
    },

    justifyBetween: {
        justifyContent: "space-between",
    },

    alignCenter: {
        alignItems: "center",
    },

    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
}

export const editor = {
    richBar: {
        width: "100%",
        backgroundColor: colors.light,
    },
    header: {
        height: 50,
        alignItems: "flex-start",
        paddingHorizontal: 8,
        zIndex: 99,
        backgroundColor: colors.light,
    },

    footer: {
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: 12,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
        zIndex: 1,
    }
}

export const header = {
    img: {
        width: 23,
        height: 23,
    }
}


export const sizes = {
    medium: {
        fontSize: 20
    }
}

export const gap = {
    small: {
        gap: 8
    },

    medium: {
        gap: 12
    },

    big: {
        gap: 16
    }
}

export const padding = {
    smallHorizontal: {
        paddingHorizontal: 8
    },

    mediumHorizontal: {
        paddingHorizontal: 12
    },

    bigHorizontal: {
        paddingHorizontal: 16
    },

    smallVertical: {
        paddingVertical: 8,
    },
    mediumVertical: {
        paddingVertical: 12,
    },
    bigVertical: {
        paddingVertical: 16,
    },

    smallTop: {
        paddingTop: 8,
    },
    mediumTop: {
        paddingTop: 12,
    },
    bigTop: {
        paddingTop: 16,
    },
}

export const margin = {
    smallHorizontal: {
        marginHorizontal: 8
    },

    mediumHorizontal: {
        marginHorizontal: 12
    },

    bigHorizontal: {
        marginHorizontal: 16
    },

    smallVertical: {
        marginVertical: 8,
    },
    mediumVertical: {
        marginVertical: 12,
    },
    bigVertical: {
        marginVertical: 16,
    },

    smallTop: {
        marginTop: 8,
    },
    mediumTop: {
        marginTop: 12,
    },
    bigTop: {
        marginTop: 16,
    },
}

export const borderRadius = {
    small: {
        borderRadius: 8
    },
    medium: {
        borderRadius: 12
    },
    big: {
        borderRadius: 16
    }
}

export const borderWidth = {
    small: {
        borderWidth: 1
    },
    medium: {
        borderWidth: 2
    },
    big: {
        borderWidth: 3
    },
}

export const borderColor = {
    light: {
        borderColor: colors.light
    },

    dark: {
        borderColor: colors.dark
    }
}

export const components = {
    header: [
        layout.row,
        layout.justifyBetween,
        layout.alignCenter,
        layout.backgroundLight,
        padding.mediumHorizontal,
        padding.mediumVertical,
        gap.small
    ],

    row: [
        layout.row,
        layout.alignCenter,
        gap.medium,
    ],

    error: [
        ui.text,
        { color: "red" }
    ],

    button: [
        layout.backgroundLight,
        layout.w100,
        padding.smallVertical,
        borderRadius.small,
    ]
}