import { useFonts,
    SourceSerifPro_200ExtraLight,
    SourceSerifPro_200ExtraLight_Italic,
    SourceSerifPro_300Light,
    SourceSerifPro_300Light_Italic,
    SourceSerifPro_400Regular,
    SourceSerifPro_400Regular_Italic,
    SourceSerifPro_600SemiBold,
    SourceSerifPro_600SemiBold_Italic,
    SourceSerifPro_700Bold,
    SourceSerifPro_700Bold_Italic,
    SourceSerifPro_900Black,
    SourceSerifPro_900Black_Italic,
  } from '@expo-google-fonts/source-serif-pro';

export default function useLoadFonts(): [boolean, Error | null] {
    return useFonts({
        SourceSerifPro_200ExtraLight,
        SourceSerifPro_200ExtraLight_Italic,
        SourceSerifPro_300Light,
        SourceSerifPro_300Light_Italic,
        SourceSerifPro_400Regular,
        SourceSerifPro_400Regular_Italic,
        SourceSerifPro_600SemiBold,
        SourceSerifPro_600SemiBold_Italic,
        SourceSerifPro_700Bold,
        SourceSerifPro_700Bold_Italic,
        SourceSerifPro_900Black,
        SourceSerifPro_900Black_Italic,
    })
}
